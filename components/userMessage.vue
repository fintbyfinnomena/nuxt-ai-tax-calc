<script>
import { useMessageStore } from "../stores/MessageStore";
import { useAuthStore } from '../stores/AuthStore';

export default {
    props: ['data'],
    data() {
        return {
            MessageStore: null,
            AuthStore: null
        }
    },
    created() {
        this.MessageStore = useMessageStore();
        this.AuthStore = useAuthStore();
    },
    
}
</script>
<template>
    <div class="flex justify-end">
        <div class="flex flex-col w-auto leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-xl rounded-se-none dark:bg-gray-700">
            <div class="flex items-center space-x-2 rtl:space-x-reverse">
                <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ this.AuthStore.user_obj.name }}</span>
            </div>
            <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{{ data }}</p>
        </div>
        <img class="w-8 h-8 rounded-full mr-7 ml-2" :src="this.AuthStore.user_obj.profPic" alt="Finnomena Icon">
    </div>
</template>
<style>
    
</style>