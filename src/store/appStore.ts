import {reactive} from "vue";
import type {Thread} from "@/api/thread/thread";

export type IAppStore = {
    selectedThread: Thread | null;
}

export const AppStore = reactive<IAppStore>({selectedThread: null});