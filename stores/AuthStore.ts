import { defineStore } from "pinia";
export const useAuthStore = defineStore("authStore", {
    state: () => ({
        user_obj: {
            name: '',
            email: '',
            profPic: '',
            access_token: '',
        },
    })
})