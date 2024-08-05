<template>
    <div>
        <div class="mx-3 max-w-screen-xl md:mx-auto w-6/7">
            <div class="grid max-w-screen-xl mx-auto h-2/8">
                <nav class="flex justify-between mt-10 mb-5">
                    <div class="text-left inline-flex align-middle">
                        <div class="flex items-center">
                            <img :src="AuthStore.user_obj.profPic" alt="Profile Picture"
                                class="rounded-full h-10 w-10" />
                            <span class="ml-5 font-medium">{{ AuthStore.user_obj.name }}</span>
                        </div>
                    </div>
                    <div class="text-right">
                        <Button @click="signout()"
                            class="ml-5 bg-transparent text-primary border border-primary hover:text-white hover:bg-primary">ออกจากระบบ
                        </Button>
                        <Button @click="Clear()"
                            class="ml-5 bg-transparent text-primary border border-primary hover:text-white hover:bg-primary">Clear
                            History
                        </Button>
                    </div>

                </nav>
            </div>
            <div class="h-6/8">
                <ChatView />
            </div>
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
            isOpen: false,
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
        // this.initChat();
        // this.isOpen = true;
        // console.log(this.MessageStore.startingOption);
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

                })
                .catch(error => {
                    // Handle any errors
                    console.error(error);
                });
        }
    }
}
</script>
<style></style>