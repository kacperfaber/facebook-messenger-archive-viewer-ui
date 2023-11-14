import {describe, expect, test, vi} from "vitest";
import {ProdApi} from "@/api/api";
import type {MessageApiModel} from "@/api/message/message";
import type {PaginationApiModel} from "@/api/pagination";
import axios from "axios";

describe("api", () => {
    describe("ProdApi", () => {
        describe("getAllMessages", () => {
            const defaultMessagesResult: PaginationApiModel<MessageApiModel> = {
                total: 1,
                page: 0,
                per_page: 1,
                items: [
                    {
                        type: "generic",
                        attachments: [],
                        id: 0,
                        sender_name: "Kacper Faber",
                        sent_at: new Date(2023, 1, 1, 12, 0, 0),
                        content: "Hello World!",
                        call_duration: undefined
                    }
                ]
            };

            const defaultResponse = {
                data: defaultMessagesResult
            }

            test("does not throw", ()=>{
                vi.spyOn(axios, "get").mockResolvedValueOnce(defaultResponse);
                expect(() => new ProdApi().getAllMessages(0)).not.throws();
            });

            test("returns expected items length", async () => {
                vi.spyOn(axios, "get").mockResolvedValueOnce(defaultResponse);
                expect((await new ProdApi().getAllMessages(0)).length).toBe(1);
            });

            test("returns expected items length", async () => {
                vi.spyOn(axios, "get").mockResolvedValueOnce(defaultResponse);
                expect((await new ProdApi().getAllMessages(0)).length).toBe(1);
            });

            test("returns expected item data", async () => {
                vi.spyOn(axios, "get").mockResolvedValueOnce(defaultResponse);
                const result = await new ProdApi().getAllMessages(0);
                const item = result[0];
                expect(item.type).toBe("generic");
                expect(item.id).toBe(0)
                expect(item.attachments.length).toBe(0);
                expect(item.senderName).toBe("Kacper Faber");
                expect(item.sentAt).toStrictEqual(new Date(2023, 1, 1, 12, 0, 0));
                expect(item.content).toBe("Hello World!");
                expect(item.callDuration).toBe(undefined);
            });
        });
    });
});