import type {Message, MessageApiModel} from "@/api/message/message";
import axios from "axios";
import MessageConverter from "@/api/message/messageConverter";
import type {Thread} from "@/api/thread/thread";
import ThreadConverter from "@/api/thread/threadConverter";
import type {PaginationApiModel} from "@/api/pagination";

export type Pagination<T> = {
    items: T[];
    page: number;
    perPage: number;
    total: number;
}

export interface IApi {
    getAllMessages(threadId: number): Promise<Message[]>;

    getAllThreads(limit: number, page: number): Promise<Thread[]>;

    getMessagesPaginated(threadId: number, limit: number, page: number): Promise<Pagination<Message>>;
}

export class ProdApi implements IApi {
    public async getAllMessages(threadId: number): Promise<Message[], PaginationApiModel<MessageApiModel>> {
        return axios.get(`/conversation/${threadId}/messages/desc`)
            .then(r => MessageConverter.convertMessages(r.data.items));
    }

    public async getAllThreads(limit: number = 0, page: number = 0): Promise<Thread[]> {
        return axios.get(`/conversation/all?limit=${limit}&page=${page}`)
            .then(r => ThreadConverter.convertThreads(r.data.items));
    }

    public async getMessagesPaginated(threadId: number, limit: number, page: number): Promise<Pagination<Message>> {
        return axios.get(`/conversation/${threadId}/messages/desc?limit=${limit}&page=${page}`)
            .then(resp => {
                const paginationApiModel = resp.data as PaginationApiModel<MessageApiModel>;

                return {
                    items: MessageConverter.convertMessages(paginationApiModel.items),
                    perPage: paginationApiModel.per_page,
                    page: paginationApiModel.page,
                    total: paginationApiModel.total
                } as Pagination<Message>;
            })
    }
}

type DevApiDataT = {
    threads: (Thread & { messages: Message[] })[];

    generateMessages(senderNames: string[], max: number): Message[];
}

const DevApiData: DevApiDataT = {
    threads: [
        {
            id: 0,
            title: "Karolina Karolinka",
            type: "CONVERSATION",
            relPath: "/inbox/karolinka_karolinka",
            path: "/messages/archived_threads/karolinka_karolinka",
            location: "INBOX",
            messages: [
                {
                    id: 0,
                    sentAt: new Date(2023, 1, 1, 12, 0, 0),
                    content: "Hello Karolinka",
                    senderName: "Kacper Faber",
                    type: "generic",
                    attachments: []
                },
                {
                    id: 1,
                    sentAt: new Date(2023, 1, 1, 12, 1, 0),
                    content: "Hello Kacper",
                    senderName: "Karolina Karolinka",
                    type: "generic",
                    attachments: []
                },
                {
                    id: 2,
                    sentAt: new Date(2023, 1, 1, 12, 2, 0),
                    content: "What's up?",
                    senderName: "Karolina Karolinka",
                    type: "generic",
                    attachments: []
                },
                {
                    id: 3,
                    sentAt: new Date(2023, 1, 1, 12, 3, 0),
                    content: "Nothing",
                    senderName: "Kacper Faber",
                    type: "generic",
                    attachments: []
                }
            ]
        },

        {
            id: 1,
            title: "Kamil Kamil",
            type: "CONVERSATION",
            relPath: "/inbox/kamil_kamil",
            path: "/messages/inbox/kamil_kamil",
            location: "INBOX",
            messages: []
        },

        {
            id: 2,
            title: "Adam Adam",
            type: "CONVERSATION",
            relPath: "/archived_threads/adam_adam",
            path: "/messages/archived_threads/adam_adam",
            location: "ARCHIVED",
            messages: []
        }
    ],

    generateMessages(senderNames: string[], max: number): Message[] {
        const result: Message[] = [];

        for (let x = 0; x < max; x++) {
            const message: Message = {
                id: x,
                attachments: [],
                type: "generic",
                senderName: senderNames[Math.floor(Math.random() * senderNames.length)],
                sentAt: new Date(2023, 1, Math.floor(Math.random() * 28), Math.floor(Math.random() * 23), Math.floor(Math.random() * 59)),
                content: (Math.random() + 1).toString(36).substring(7),
                callDuration: null
            }

            result.push(message);
        }

        return result.sort((msgA, msgB) => new Date(msgA.sentAt) - new Date(msgB.sentAt));
    }
}

export class DevApi implements IApi {
    public async getAllMessages(threadId: number): Promise<Message[]> {
        return DevApiData.threads.find(x => x.id == threadId)?.messages ?? [];
    }

    public async getAllThreads(limit: number, page: number): Promise<Thread[]> {
        return Promise.resolve(DevApiData.threads);
    }

    getMessagesPaginated(threadId: number, limit: number, page: number): Promise<Pagination<Message>> {
        const senderNames = ["Kacper Faber", "Karolinka Karolina", "Kamil Kamil", "Adam Adam"];
        const messages = DevApiData.generateMessages(senderNames, limit)
        return Promise.resolve({total: 1000, page, perPage: limit, items: messages});
    }
}

export const Api: IApi = import.meta.env.DEV ? new DevApi() : new ProdApi();