export type MessageAttachmentType = "photo" | "video" | "gif" | "audio";

export type MessageAttachment = {
    id: number;
    messageId: number;
    uri: string;
    thumbnailUri: string;
    type: MessageAttachmentType;
    createdAt: Date;
}

export type MessageType = "share" | "call" | "generic" | "subscribe" | "unsubscribe";

export type Message = {
    id: number;
    senderName: string;
    sentAt: Date;
    callDuration?: number;
    content?: string;
    type: MessageType;
    attachments: MessageAttachment[];
}

export type MessageAttachmentApiModel = {
    id: number;
    message_id: number;
    uri: string;
    thumbnail_uri: string;
    type: MessageAttachmentType;
    created_at: Date;
}

export type MessageApiModel = {
    id: number;
    sender_name: string;
    sent_at: Date;
    call_duration?: number;
    content?: string;
    type: MessageType;
    attachments: MessageAttachmentApiModel[];
}