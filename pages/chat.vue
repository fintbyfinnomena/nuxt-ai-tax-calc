<template>
    <div class="h-screen">
        <div class="mx-3 max-w-screen-xl md:mx-auto w-6/7 h-5/6">
            <div class="grid max-w-screen-xl mx-auto ">
                <nav class="flex justify-between mt-10">
                    <div class="text-left inline-flex align-middle">
                        <div class="flex items-center">
                            <img :src="AuthStore.user_obj.profPic" alt="Profile Picture"
                                class="rounded-full h-10 w-10" />
                            <span class="ml-5 font-medium">{{ AuthStore.user_obj.name }}</span>
                        </div>
                    </div>
                    <div class="text-right">
                        <TaxInfo v-model:open="isOpen" />
                        <Button @click="signout()"
                            class="ml-5 bg-transparent text-primary border border-primary hover:text-white hover:bg-primary">ออกจากระบบ</Button>
                    </div>

                </nav>
            </div>
            <div class="flex flex-col mx-auto rounded-lg my-10 h-screen">
                <ChatView/>
            </div>
        </div>
    </div>
</template>
<script>
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useAuthStore } from "../stores/AuthStore";
import { Button } from '@/components/ui/button'

export default {
    data() {
        return {
            nuxtApp: useNuxtApp(),
            AuthStore: null,
            isOpen: false
        };
    },
    created() {
        this.AuthStore = useAuthStore()
    },
    mounted() {
        this.checkAuth();
        // this.isOpen = true;
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
        }
    }
}
</script>
<style></style>