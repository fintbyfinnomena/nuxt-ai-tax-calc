<template>
    <div class="w-11/12 md:w-5/6 lg:w-4/6 h-svh mx-auto flex flex-col">
        <div id="nav" class="flex items-center justify-between py-10">
            <!-- <div class="text-left inline-flex align-middle"> -->
            <div class="flex-1">
                <div class="flex items-center">
                    <img :src="AuthStore.user_obj.profPic" alt="Profile Picture" class="rounded-full h-10 w-10" />
                    <span class="hidden md:inline-block ml-5 font-medium">{{ AuthStore.user_obj.name }}</span>
                </div>
            </div>
            <div class="flex-1 text-right flex justify-end space-x-4">
                <Button @click="signout()"
                    class="ml-5 bg-transparent text-primary border border-primary rounded-2xl hover:text-white hover:bg-primary">ออกจากระบบ
                </Button>
                <Button @click="Clear()"
                    class="ml-5 bg-primary text-white border border-primary rounded-2xl hover:text-primary hover:bg-transparent"><Icon icon="iconoir:restart" size="1.4em"/>
                    เริ่มการสนทนาใหม่
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
import { Button } from '@/components/ui/button'

export default {
    data() {
        return {
            nuxtApp: useNuxtApp(),
            AuthStore: null,
            MessageStore: null,
            config: null,
        };
    },
    created() {
        this.AuthStore = useAuthStore();
        this.MessageStore = useMessageStore();
        this.config = useRuntimeConfig();
    },
    mounted() {
        this.checkAuth();
    },
    methods: {
        checkAuth() {
            onAuthStateChanged(this.nuxtApp.$auth, (user) => {
                if (user) {
                    console.log("user is authenticated")
                    const uid = user.uid;
                    this.AuthStore.user_obj.name = user.displayName;
                    this.AuthStore.user_obj.email = user.email;
                    this.AuthStore.user_obj.profPic = user.photoURL;
                    this.AuthStore.user_obj.access_token = user.accessToken;
                    this.AuthStore.user_obj.uid = uid;

                    console.log(this.AuthStore.user_obj.name);
                    // ...
                } else {
                    // User is signed out
                    console.log("user is not authenticated");
                    window.location.href = "/";
                }
            });
        },
        signout() {
            signOut(this.nuxtApp.$auth).then(() => {
                window.location.href = "/";
            }).catch((error) => {
                // An error happened.
                console.log(error);
            });
        },
        open() {
            this.isOpen = true;
        },
        Clear() {
            fetch(`${this.config.public.url.serviceUrl}/api/v1/langchain-chat/chats`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': this.AuthStore.user_obj.uid,
                },
                // body: JSON.stringify({ key: 'value' })
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Clear Successful")
                    console.log(data)
                    // Handle the response data
                    this.AuthStore.user_obj.chatid = data.chat_id;
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