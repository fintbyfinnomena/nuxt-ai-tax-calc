<template>
  <div class="w-11/12 md:w-5/6 lg:w-4/6 h-screen mx-auto flex flex-col">
      <navbar/>
      <div id="prompt">
          <div v-if="isinit">
              <promptView />
          </div>
          <div v-else class="text-center">
              <div class="flex items-center justify-center">
                  <img src="../assets/animations/loading.gif" alt="loading">
              </div>
              <br>
              กำลังเชื่อมต่อกับระบบ...
          </div>
      </div>
  </div>
</template>

<script>
import { useAuth } from "../stores/FinnoAuthStore";

export default {
  data() {
    return {
      nuxtApp: useNuxtApp(),
      UserStore: null,
      MessageStore: null,
      FinnoAuthStore: null,
      config: null,
      isinit: false,
    };
  },
  created() {
    this.config = useRuntimeConfig();
    this.UserStore = useUser();
    this.FinnoAuthStore = useAuth();
  },
  mounted() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      if (!this.UserStore.user) {
        window.location.href = "/"; 
      } 
      this.initChat();
    },
    initChat() {
      fetch(
        `${this.config.public.url.serviceUrl}/api/v1/langchain-chat/chats`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "user-id": this.UserStore.user.userID,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          this.UserStore.setChatID(data.chat_id);
          this.isinit = true;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    signout() {
      this.FinnoAuthStore.logout();
    },
  },
};
</script>
<style>
#nav {
  height: 10%;
}

#prompt {
  height: 90%;
}
</style>
