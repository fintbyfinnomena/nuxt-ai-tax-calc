<script>
import { Button } from "@/components/ui/button";
import { useMessageStore } from "../stores/MessageStore";
import { useAuthStore } from "../stores/AuthStore";

export default {
  data() {
    return {
      streamMessage: "",
      newMessage: "",
      streaming: false,
      msgSent: false,
      MessageStore: null,
      AuthStore: null,
      MessageArray: [],
      prePopulateMsg: "",
      config: null
    };
  },
  created() {
    this.AuthStore = useAuthStore();
    this.MessageStore = useMessageStore();
    this.MessageArray = this.MessageStore.message_obj.messagesList;
    this.prePopulateMsg = this.MessageStore.autoMsg;
    this.config = useRuntimeConfig();
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
        console.log("Success!");
      }
    );
  },
  updated() {
    this.scrollToElement();
  },
  methods: {
    prePopulate(e) {
      console.log("EVENT", e);
      this.newMessage = e;
      this.submit_message();
    },
    submit_message() {
      if (this.newMessage.trim() != "") {
        this.msgSent = true;
        let msg_object = {
          index: this.MessageStore.message_obj.index,
          value: this.newMessage,
          role: "user",
        };
        this.MessageStore.addMessage(msg_object);
        // console.log(this.MessageStore.message_obj.messagesList.length)
        let payload = {
          question: this.newMessage,
        };
        this.newMessage = "";
        const headers = {
          "Content-type": "application/json",
          "user-id": this.AuthStore.user_obj.uid,
        };
        fetch(
          `${this.config.public.url.serviceUrl}/api/v1/langchain-chat/chats/${this.AuthStore.user_obj.chatid}`,
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload),
          }
        )
          .then((response) => {
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            const readStream = () => {
              reader.read().then(({ done, value }) => {
                this.msgSent = false;
                this.streaming = true;
                if (done) {
                  let ai_text = this.streamMessage;
                  let ai_msg = {
                    index: this.MessageStore.message_obj.index,
                    value: ai_text,
                    role: "ai",
                    downvote: false,
                  };
                  this.MessageStore.addMessage(ai_msg);
                  // console.log(this.MessageStore.message_obj.messagesList.length)
                  this.streamMessage = "";
                  this.streaming = false;
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
            console.log(this.MessageStore.message_obj.messagesList.length);
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
  <div class="h-svh">
    <div
      class="flex flex-col mx-auto w-6/7 h-5/6 bg-white rounded-lg shadow-lg"
    >
      <div id="chat-container" class="flex-grow mt-10 overflow-scroll">
        <div v-for="message in MessageArray">
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
        <div v-if="streaming == true && msgSent == false">
          <streamMessage :data="streamMessage" class="mb-10 mr-5 md:mr-0" />
        </div>
        <div v-if="msgSent == true && streaming == false">
          <loading class="mb-10" />
        </div>
      </div>
      <div class="p-5 md:p-10">
        <div v-if="msgSent == false && streaming == false">
          <div class="flex items-center px-3 py-2">
            <textarea
              rows="1"
              @keydown="handleKeyDown"
              class="block resize-none mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border"
              id="message"
              type="text"
              placeholder="ถามคำถาม..."
              v-model="newMessage"
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
              class="block resize-none mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border"
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
<style></style>
