import { defineStore } from "pinia";

export const useMessageStore = defineStore("messageStore", {
    state: () => ({
        message_obj: {
            messagesList : [] as any,
            index: 0,
        }
    }),
    actions: {
        addMessage(MessageObj: any) {
            this.message_obj.messagesList.push(MessageObj);
            this.message_obj.index += 1;
        },
        clearMessages() {
            this.message_obj.messagesList = [];
        },
    },
})