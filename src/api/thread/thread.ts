
export type ThreadType = "GROUP" | "CONVERSATION" | "PENDING";

export type ThreadLocation = "ARCHIVED" | "INBOX" | "MESSAGE_REQUESTS" | "FILTERED_THREADS";

export type ThreadApiModel = {
    id: number;
    title: string;
    thread_type: ThreadType;
    thread_path: string;
    rel_path: string;
    location: ThreadLocation;
}

export type Thread = {
    id: number;
    title: string;
    type: ThreadType;
    path: string;
    relPath: string;
    location: ThreadLocation;
}