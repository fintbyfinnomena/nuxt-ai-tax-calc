import { defineStore } from "pinia";

export const useMessageStore = defineStore("messageStore", {
  state: () => ({
    message_obj: {
      messagesList: [] as any,
      index: 0,
    },
    startingOption: 0,
    Questions: [
      {
        option: 1,
        title: "Want to allocate as portfolio",
        sub: "Create a portfolio tailored for you",
      },
      {
        option: 2,
        title: "What are funds that Finnomena recommend?",
        sub: "Complete with SSF, RMF, and ThaiESG",
      },
      {
        option: 3,
        title: "Knowledge about tax saving fund",
        sub: "No need to waste time searching. Ask and get an immediate answer!",
      },
    ],
    autoMsg: "",
  }),
  actions: {
    addMessage(MessageObj: any) {
      this.message_obj.messagesList.push(MessageObj);
      this.message_obj.index += 1;
    },
    clearMessages(chat_id: string) {
      console.log(chat_id);
      this.message_obj.messagesList = [];
    },
    SetstartingOption(value: number) {
      this.startingOption = value;
    },
    setAutoMsg(value: string) {
      this.autoMsg = value;
    },
  },
});
