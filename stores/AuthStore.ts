import { defineStore } from "pinia";
export const useAuthStore = defineStore("authStore", {
    state: () => ({
        user_obj: {
            uid: '',
            name: '',
            email: '',
            profPic: '',
            access_token: '',
            chatid: '',
        },
    })
})