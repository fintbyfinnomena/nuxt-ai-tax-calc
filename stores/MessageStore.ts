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
        sub: "จัดพอร์ตให้เลยแบบที่เหมาะกับคุณ",
      },
      {
        option: 2,
        title: "What are funds that Finnomena recommend?",
        sub: "ครบทั้ง SSF, RMF และ ThaiESG",
      },
      {
        option: 3,
        title: "Knowledge about tax saving fund",
        sub: "ไม่ต้องเปิดหาให้เสียเวลา ถามปุ้บตอบปั้บ รู้เรื่อง!",
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
