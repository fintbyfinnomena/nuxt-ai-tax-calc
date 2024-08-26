<script>
import { Button } from "@/components/ui/button";
import { useMessageStore } from "../stores/MessageStore";
import { useUser } from "../stores/UserStore";
import { useChat } from "../stores/ChatStore";

export default {
  data() {
    return {
      streamMessage: "",
      newMessage: "",
      // streaming: false,
      // msgSent: false,
      MessageStore: null,
      UserStore: null,
      ChatStore: null,
      prePopulateMsg: "",
      Rendered: false,
      config: null,
    };
  },
  created() {
    this.MessageStore = useMessageStore();
    this.config = useRuntimeConfig();
    this.UserStore = useUser();
    this.prePopulateMsg = this.MessageStore.autoMsg;
    this.ChatStore = useChat();
  },
  mounted() {
    let selected = this.MessageStore.startingOption;
    if (selected != 0) {
      this.prePopulate(this.MessageStore.Questions[selected - 1].title);
    } else {
      navigateTo("/prompt");
    }
    watch(
      () => this.MessageStore.autoMsg,
      (newName) => {
        this.prePopulateMsg = newName;
        this.prePopulate(this.prePopulateMsg);
      }
    );
    watch(
      () => this.MessageStore.Rendered,
      (isRendered) => {
        this.prePopulateMsg = isRendered;
        this.scrollToElement();
      }
    );
  },
  updated() {
    this.scrollToElement();
  },
  methods: {
    prePopulate(e) {
      this.newMessage = e;
      this.submit_message();
    },
    submit_message() {
      if (this.newMessage.trim() != "") {
        this.MessageStore.msgSent = true;
        this.MessageStore.Rendered = false;
        let msg_object = {
          index: this.MessageStore.message_obj.index,
          value: this.newMessage,
          role: "user",
        };
        this.MessageStore.addMessage(msg_object);
        let payload = {
          question: this.newMessage,
        };
        this.newMessage = "";
        const headers = {
          "Content-type": "application/json",
          "Finno-User-Id": this.UserStore.user.userID,
        };
        fetch(
          `charlie-web/api/charlie-service/stream/langchain-chat/chats/${this.UserStore.user.chatID}`,
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload),
          }
        )
          .then((response) => {
            switch (response.status) {
              case 200:
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                const readStream = () => {
                  reader.read().then(({ done, value }) => {
                    this.MessageStore.msgSent = false;
                    this.MessageStore.streaming = true;
                    if (done) {
                      let ai_text = this.streamMessage;
                      let ai_msg = {
                        index: this.MessageStore.message_obj.index,
                        value: ai_text,
                        role: "ai",
                        downvote: false,
                      };
                      this.MessageStore.addMessage(ai_msg);
                      this.streamMessage = "";
                      this.MessageStore.streaming = false;
                      this.scrollToElement();
                      return;
                    }
                    const text = decoder.decode(value, { stream: true });
                    this.streamMessage = this.streamMessage + text;
                    readStream();
                    this.scrollToElement();
                  });
                };
                readStream();
                break;

              case 400:
                this.MessageStore.msgSent = false;
                this.MessageStore.addMessage({
                  index: this.MessageStore.message_obj.index,
                  value:
                    "เกิดข้อผิดพลาดจากคำถามที่คุณส่งเข้ามา กรุณาส่งคำถามให้ Charlie ใหม่อีกครั้ง",
                  role: "ai",
                  downvote: false,
                });
                this.scrollToElement();
                return;
                break;

              case 429:
                this.MessageStore.msgSent = false;
                this.MessageStore.addMessage({
                  index: this.MessageStore.message_obj.index,
                  value:
                    "เนื่องจาก Charlie ยังอยู่ในช่วงทดสอบ เราจึงจำกัดการใช้งานต่อวัน คุณสามารถเข้ามาลองใช้งาน Charlie ใหม่ได้ใน 12 ชม.",
                  role: "ai",
                  downvote: false,
                });
                this.scrollToElement();
                return;
                break;
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    scrollToElement() {
      const container = this.$el.querySelector("#chat-container");
      container.scrollTop = container.scrollHeight;
    },
    handleKeyDown(event) {
      if (event.key === "Enter") {
        if (event.ctrlKey) {
          // Control + Enter pressed: Insert a new line
          this.newMessage += "\n";
        } else {
          // Enter pressed: Execute the function
          event.preventDefault(); // Prevent the default action (new line)
          this.submit_message();
        }
      }
    },
  },
};
</script>
<template>
  <div class="w-full mx-auto" id="chat_view">
    <div
      class="flex flex-col mx-auto bg-white rounded-lg shadow-lg"
      id="chat_wrap"
    >
      <div id="chat-container" class="flex-grow mt-5 overflow-y-scroll">
        <div v-if="MessageStore.message_obj.messagesList.length > 0">
          <div v-for="message in MessageStore.message_obj.messagesList">
            <div v-if="message.role == 'user'" class="mb-10">
              <userMessage :data="message.value" />
            </div>
            <div v-else>
              <aiMessage
                :data="message.value"
                :feedback="message.index"
                class="mb-10 mr-5 md:mr-0"
              />
            </div>
          </div>
        </div>
        <div
          v-if="
            this.MessageStore.streaming == true &&
            this.MessageStore.msgSent == false
          "
        >
          <streamMessage :data="streamMessage" class="mb-10 mr-5 md:mr-0" />
        </div>
        <div
          v-if="
            this.MessageStore.msgSent == true &&
            this.MessageStore.streaming == false
          "
        >
          <loading class="mb-10" />
        </div>
      </div>
      <div class="sm:px-5 sm:pb-3 sm:pt-2">
        <div
          v-if="
            this.MessageStore.msgSent == false &&
            this.MessageStore.streaming == false
          "
        >
          <div class="flex items-center px-3 py-2">
            <textarea
              rows="1"
              @keydown="handleKeyDown"
              class="block resize-none mr-2 sm:mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border"
              id="message"
              type="text"
              placeholder="ถามคำถาม..."
              v-model="newMessage"
              maxlength="200"
            ></textarea>
            <Button
              @click="submit_message()"
              class="inline-flex bg-primary justify-center p-5"
            >
              <Icon icon="iconoir:send" size="1.4em" />
            </Button>
          </div>
        </div>
        <div v-else>
          <div class="flex items-center px-3 py-2">
            <textarea
              rows="1"
              class="block resize-none mr-2 sm:mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border"
              type="text"
              placeholder="ถามคำถาม..."
              disabled
            ></textarea>
            <Button
              class="inline-flex bg-white border-primary justify-center p-5"
              disabled
            >
              <div class="size-8 align-middle pt-3 pb-2">
                <img src="../assets/animations/loading.gif" alt="loading" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
#chat_view {
  height: 80dvh;
}

#chat_wrap {
  height: 100%;
}
</style>
