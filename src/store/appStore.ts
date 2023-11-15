import {reactive} from "vue";
import type {Thread} from "@/api/thread/thread";

export type IAppStore = {
    selectedThread?: Thread;
}

export const AppStore = reactive<IAppStore>({selectedThread: null});