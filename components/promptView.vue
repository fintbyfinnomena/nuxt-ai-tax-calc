<template>
    <div class="h-svh">
        <div class="flex flex-col mx-auto w-6/7 h-5/6 bg-white rounded-lg shadow-lg">
            <div id="chat-container" class="flex flex-grow justify-center items-center">
                <img id="logo" src="../assets/img/chat-logo.png" alt="">
            </div>
            <div class="p-5 md:p-10">
                <div v-for="(question, index) in MessageStore.Questions" :key="index"
                    @click="SelectQuestion(question.option)"
                    class="bg-white rounded-lg mb-4 p-5 border flex justify-between items-center border-gray-200 cursor-pointer hover:bg-gray-100">
                    <div>
                        <h3 class="text-lg font-bold">{{ question.title }}</h3>
                        <p class="text-sm">{{ question.sub }}</p>
                    </div>
                    <div>
                        <button class="ml-auto" disabled>
                            <Icon icon="iconoir:arrow-right" size="1.4em" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useMessageStore } from "../stores/MessageStore";
export default {

    props: ['data'],
    data() {
        return {
            MessageStore: null,
        }
    },
    created() {
        this.MessageStore = useMessageStore();
    },
    methods: {
        async SelectQuestion(value) {
            this.MessageStore.SetstartingOption(value)
            await navigateTo('/chat')
        }
    },
}
</script>
<style>
#logo {
    width: 25vh;
    height: 25vh;
}
</style>