<template>
    <div class="w-11/12 md:w-5/6 lg:w-4/6 h-svh mx-auto flex flex-col">
        <div id="nav" class="flex items-center justify-between py-10">
            <!-- <div class="text-left inline-flex align-middle"> -->
            <div class="flex-1">
                <div class="flex items-center">
                    <!-- <img :src="AuthStore.user_obj.profPic" alt="Profile Picture" class="rounded-full h-10 w-10" />
                    <span class="hidden md:inline-block ml-5 font-medium">{{ AuthStore.user_obj.name }}</span> -->
                    <img :src="UserStore.user.imageURL" alt="Profile Picture" class="rounded-full h-10 w-10" />
                    <span class="hidden md:inline-block ml-5 font-medium">{{ UserStore.user.displayName }}</span>
                </div>
            </div>
            <div class="flex-1 text-right flex justify-end space-x-4">
                <Button @click="signout()"
                    class="ml-5 bg-transparent text-primary border border-primary hover:text-white hover:bg-primary">ออกจากระบบ
                </Button>
                <Button @click="Clear()"
                    class="ml-5 bg-transparent text-primary border border-primary hover:text-white hover:bg-primary">Clear
                    History
                </Button>
            </div>
        </div>
        <div id="chat">
            <ChatView />
        </div>
    </div>
</template>

<script>
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useAuthStore } from "../stores/AuthStore";
import { useMessageStore } from "../stores/MessageStore";
import { useUser } from "../stores/UserStore";
import { useAuth } from "../stores/FinnoAuthStore"
import { Button } from '@/components/ui/button'

export default {
    data() {
        return {
            nuxtApp: useNuxtApp(),
            AuthStore: null,
            UserStore: null,
            FinnoAuthStore: null,
            MessageStore: null,
            isOpen: false,
            config: null,
        };
    },
    created() {
        this.AuthStore = useAuthStore();
        this.MessageStore = useMessageStore();
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
        },
        signout() {
            this.FinnoAuthStore.logout();
        },
        open() {
            this.isOpen = true;
        },
        Clear() {
            fetch(`${this.config.public.url.serviceUrl}/api/v1/langchain-chat/chats`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': this.UserStore.user.userID,
                },
                // body: JSON.stringify({ key: 'value' })
            })
                .then(response => response.json())
                .then(data => {
                    // Handle the response data
                    this.UserStore.setChatID(data.chat_id)
                    // this.AuthStore.user_obj.chatid = data.chat_id;
                    this.MessageStore.message_obj.messagesList = [];
                    this.MessageStore.message_obj.index = 0;

                })
                .catch(error => {
                    // Handle any errors
                    console.error(error);
                });
        }
    }
}
</script>
<style>
#nav {
    height: 10%;
}

#chat {
    height: 90%;
}
</style>