import type {Message, MessageApiModel, MessageAttachment, MessageAttachmentApiModel} from "@/api/message/message";

export default {
    convertAttachment(attachment: MessageAttachmentApiModel): MessageAttachment {
        return {
            id: attachment.id,
            messageId: attachment.message_id,
            uri: attachment.uri,
            type: attachment.type,
            createdAt: attachment.created_at,
            thumbnailUri: attachment.thumbnail_uri
        } as MessageAttachment;
    },

    convertAttachments(attachments: MessageAttachmentApiModel[]): MessageAttachment[] {
        return attachments.map(a => this.convertAttachment(a));
    },

    convertMessage(msg: MessageApiModel): Message {
        return {
            id: msg.id,
            senderName: msg.sender_name,
            sentAt: msg.sent_at,
            callDuration: msg.call_duration,
            type: msg.type,
            attachments: this.convertAttachments(msg.attachments),
            content: msg.content
        } as Message;
    },

    convertMessages(messages: MessageApiModel[]): Message[] {
        return messages.map(msg => this.convertMessage(msg));
    }
}

