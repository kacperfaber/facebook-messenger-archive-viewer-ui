import type {Message} from "@/api/message/message";
import axios from "axios";
import MessageConverter from "@/api/message/messageConverter";
import type {Thread} from "@/api/thread/thread";
import ThreadConverter from "@/api/thread/threadConverter";

export interface IApi {
    getAllMessages(threadId: number): Promise<Message[]>;
    getAllThreads(limit: number, page: number): Promise<Thread[]>;
}

export class ProdApi implements IApi {
    public async getAllMessages(threadId: number): Promise<Message[]> {
        return axios.get(`/conversation/${threadId}/messages/desc`)
            .then(r => MessageConverter.convertMessages(r.data.items));
    }

    public async getAllThreads(limit: number = 0, page: number = 0): Promise<Thread[]> {
        return axios.get(`/conversation/all?limit=${limit}&page=${page}`)
            .then(r => ThreadConverter.convertThreads(r.data.items));
    }
}

export class DevApi implements IApi{
    public async getAllMessages(threadId: number): Promise<Message[]> {
        return [];
    }

    public async getAllThreads(limit: number, page: number): Promise<Thread[]> {
        return Promise.resolve([]);
    }
}

export const Api: IApi = import.meta.env.DEV ? new DevApi() : new ProdApi();