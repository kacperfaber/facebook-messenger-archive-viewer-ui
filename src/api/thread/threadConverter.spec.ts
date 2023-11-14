import {describe, test, expect} from "vitest";
import ThreadConverter from "@/api/thread/threadConverter";
import type {ThreadApiModel} from "@/api/thread/thread";

describe("ThreadConverter", () => {
    describe("convertThread", () => {
        const defaultThreadApiModel = {
            thread_type: "CONVERSATION",
            thread_path: "/test/thread/",
            rel_path: "thread/",
            location: "INBOX",
            title: "Karolina Smith",
            id: 1
        } as ThreadApiModel;

        test("does not throw", () => {
            expect(() => ThreadConverter.convertThread(defaultThreadApiModel)).not.throws();
        });

        test("returns not null", () => {
            expect(ThreadConverter.convertThread(defaultThreadApiModel)).not.toBe(null);
        });

        test("returns expected data", () => {
            const result = ThreadConverter.convertThread(defaultThreadApiModel);

            expect(result.id).toBe(defaultThreadApiModel.id);
            expect(result.title).toBe(defaultThreadApiModel.title);
            expect(result.type).toBe(defaultThreadApiModel.thread_type);
            expect(result.location).toBe(defaultThreadApiModel.location);
            expect(result.path).toBe(defaultThreadApiModel.thread_path);
            expect(result.relPath).toBe(defaultThreadApiModel.rel_path);
        });
    });
});