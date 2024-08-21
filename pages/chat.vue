<template>
  <div class="w-11/12 md:w-5/6 lg:w-4/6 h-screen mx-auto flex flex-col">
    <div id="navbar">
      <navbar />
      <div class="flex items-center justify-between">
        <div class="flex-1 text-right flex justify-end space-x-4 -mt-2 pb-4">
          <TaxInfo v-model:open="isOpen" location="nav-bar" />
          <Button
            @click="clearChatHistory()"
            class="ml-5 bg-transparent text-primary border border-primary rounded-2xl hover:text-white hover:bg-primary"
            data-fn-location="nav-bar"
            data-fn-action="reset-conversation_click"
          >
            <Icon icon="iconoir:refresh-double" size="1.4em" />
            <p class="hidden sm:inline ml-2">เริ่มการสนทนาใหม่</p>
          </Button>
        </div>
      </div>
    </div>
    <div id="chat">
      <ChatView />
    </div>
    <div id="footer" class="mt-4">
      <p class="text-sm text-gray-500">
        <Icon icon="iconoir:info-circle" size="1.2em" />
        ระบบคำนวณยอดเงินลงทุนในกองทุนลดหย่อนภาษีนี้เป็นการคำนวณเพียงเบื้องต้น
        โดยใช้ข้อมูลจากกรมสรรพากรสำหรับปีภาษี 2567 เท่านั้น
        ทางบริษัทขอไม่รับรองความถูกต้องของข้อมูลและผลลัพธ์
        ในกรณีที่มีการเปลี่ยนแปลงข้อมูลเกี่ยวกับการลดหย่อนภาษี...<terms
          class="inline"
          text="อ่านเพิ่มเติม"
        />
      </p>
    </div>
  </div>
</template>

<script>
import { useMessageStore } from "../stores/MessageStore";
import { useUser } from "../stores/UserStore";
import { Button } from "@/components/ui/button";

export default {
  data() {
    return {
      nuxtApp: useNuxtApp(),
      MessageStore: null,
      UserStore: null,
      config: null,
    };
  },
  created() {
    this.MessageStore = useMessageStore();
    this.UserStore = useUser();
    this.config = useRuntimeConfig();
  },
  mounted() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      if (!this.UserStore.user) {
        window.location.href = "/";
      }
    },
    clearChatHistory() {
      fetch(
        `${this.config.public.url.serviceUrl}/api/v1/langchain-chat/chats`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "user-id": this.UserStore.user.userID,
          },
          // body: JSON.stringify({ key: 'value' })
        }
      )
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data
          this.UserStore.setChatID(data.chat_id);
          this.MessageStore.message_obj.messagesList = [];
          this.MessageStore.message_obj.index = 0;
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
    },
  },
};
</script>
<style scoped></style>
