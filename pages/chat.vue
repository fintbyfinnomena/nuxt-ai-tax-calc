<template>
<<<<<<< HEAD
    <div class="w-11/12 md:w-5/6 lg:w-4/6 h-svh mx-auto flex flex-col">
        <div id="nav" class="flex items-center justify-between py-10">
            <!-- <div class="text-left inline-flex align-middle"> -->
            <div class="flex-1">
                <div class="flex items-center">
                    <!-- <img :src="AuthStore.user_obj.profPic" alt="Profile Picture" class="rounded-full h-10 w-10" />
                    <span class="hidden md:inline-block ml-5 font-medium">{{ AuthStore.user_obj.name }}</span> -->
                    <img :src="UserStore.user.imageURL" alt="Profile Picture" class="rounded-full h-10 w-10" />
                    <span class="hidden md:inline-block ml-5 font-medium">{{ UserStore.user.displayName }}</span>
=======
    <div class="w-11/12 md:w-5/6 lg:w-4/6 h-screen mx-auto flex flex-col">
        <div id="navbar">
            <navbar />
            <div class="flex items-center justify-between pb-5">
                <div class="flex-1 text-right flex justify-end space-x-4">
                    <TaxInfo v-model:open="isOpen" />
                    <Button @click="Clear()"
                        class="ml-5 bg-transparent text-primary border border-primary rounded-2xl hover:text-white hover:bg-primary"
                        data-fn-location="nav-bar"
                        data-fn-action="reset-conversation_click">
                        <Icon icon="iconoir:refresh-double" size="1.4em" />
                        เริ่มการสนทนาใหม่
                    </Button>
>>>>>>> develop
                </div>
            </div>
        </div>
        <div id="chat">
            <ChatView />
        </div>
        <div id="footer" class="mt-4">
            <p class="text-sm text-gray-500">
                <Icon icon="iconoir:info-circle" size="1.2em" />ระบบคำนวณยอดเงินลงทุนในกองทุนลดหย่อนภาษีนี้เป็นการคำนวณเพียงเบื้องต้น
                โดยใช้ข้อมูลจากกรมสรรพากรสำหรับปีภาษี 2567 เท่านั้น
                ทางบริษัทขอไม่รับรองความถูกต้องของข้อมูลและผลลัพธ์
                ในกรณีที่มีการเปลี่ยนแปลงข้อมูลเกี่ยวกับการลดหย่อนภาษี...<terms class="display-inline"/>
            </p>
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
#navbar {
    height: 15%;
    margin-bottom: 1em;
}

#chat {
    height: 80%;
}
#foot {
    height: 5%;
}
</style>