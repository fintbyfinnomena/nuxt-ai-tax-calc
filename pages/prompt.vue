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
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useAuthStore } from "../stores/AuthStore";
export default {
    data() {
        return {
            nuxtApp: useNuxtApp(),
            AuthStore: null,
            MessageStore: null,
            config: null,
            isinit: false
        };
    },
    created() {
        this.AuthStore = useAuthStore();
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
                    this.initChat();
                    // ...
                } else {
                    // User is signed out
                    console.log("user is not authenticated");
                    window.location.href = "/";
                }
            });
        },
        initChat() {
            console.log("POSTING CHAT");
            console.log(this.AuthStore.user_obj.uid);
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
                    console.log(data)
                    // Handle the response data
                    this.AuthStore.user_obj.chatid = data.chat_id;
                    this.isinit = true;
                })
                .catch(error => {
                    // Handle any errors
                    console.error(error);
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
    }
}
</script>
<style>
#nav {
    height: 10%;
}

#prompt {
    height: 90%;
}
</style>