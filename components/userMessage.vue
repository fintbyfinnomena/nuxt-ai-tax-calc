<script>
import { useMessageStore } from "../stores/MessageStore";
import { useAuthStore } from '../stores/AuthStore';
import { useUser } from '../stores/UserStore';

export default {
    props: ['data'],
    data() {
        return {
            MessageStore: null,
            AuthStore: null,
            UserStore: null
        }
    },
    created() {
        this.MessageStore = useMessageStore();
        this.AuthStore = useAuthStore();
        this.UserStore = useUser();
    },
    
}
</script>
<template>
    <div class="flex justify-end">
        <div class="flex flex-col w-auto leading-1.5 px-4 border-gray-200 bg-gray-100 rounded-xl rounded-se-none dark:bg-gray-700">
            <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{{ data }}</p>
        </div>
        <!-- <img class="w-8 h-8 rounded-full mr-7 ml-2" :src="this.AuthStore.user_obj.profPic" alt="Finnomena Icon"> -->
        <img class="w-8 h-8 rounded-full mr-7 ml-2" :src="this.UserStore.user.imageURL" alt="Finnomena Icon">
    </div>
</template>
<style>
    
</style>