import type {Thread, ThreadApiModel} from "@/api/thread/thread";

export default {
    convertThread(th: ThreadApiModel): Thread {
        return {
            path: th.thread_path,
            relPath: th.rel_path,
            type: th.thread_type,
            title: th.title,
            id: th.id,
            location: th.location
        } as Thread;
    },

    convertThreads(th: ThreadApiModel[]): Thread[] {
        return th.map(t => this.convertThread(t));
    }
}