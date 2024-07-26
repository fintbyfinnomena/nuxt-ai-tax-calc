<script>
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useMessageStore } from "../stores/MessageStore";
import { useAuthStore } from '../stores/AuthStore';

export default {

    data() {
        return {
            streamMessage: '',
            newMessage: '',
            MessageStore: null,
            streaming: false,
            AuthStore: null,
            MessageArray: []
        }
    },
    created() {
        this.AuthStore = useAuthStore();
        this.MessageStore = useMessageStore();
        this.MessageArray = this.MessageStore.message_obj.messagesList;
    },
    updated() {
        this.scrollToElement();
    },
    methods: {
        submit_message() {
            if (this.newMessage.trim() != "") {
                let msg_object = { index: this.MessageStore.message_obj.index, value: this.newMessage, role: 'user' };
                this.MessageStore.addMessage(msg_object);
                console.log(this.MessageStore.message_obj.messagesList.length)
                let payload = {
                    question: this.newMessage
                }
                this.newMessage = '';
                const headers = {
                    "Content-type": "application/json",
                    "session-id": this.AuthStore.session_id,
                }
                fetch('http://localhost:8080/api/v1/langchain-chat/question', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(payload)
                }).then(response => {
                    const reader = response.body.getReader();
                    const decoder = new TextDecoder();
                    const readStream = () => {
                        reader.read().then(({ done, value }) => {
                            this.streaming = true;
                            if (done) {
                                let ai_text = this.streamMessage;
                                let ai_msg = { index: this.MessageStore.message_obj.index, value: ai_text, role: 'ai' };
                                this.MessageStore.addMessage(ai_msg);
                                console.log(this.MessageStore.message_obj.messagesList.length)
                                this.streamMessage = '';
                                this.streaming = false;
                                this.scrollToElement();
                                return;
                            }
                            const text = decoder.decode(value, { stream: true });
                            this.streamMessage = this.streamMessage + text;
                            readStream();
                            this.scrollToElement();
                        });
                    };
                    readStream();
                    console.log(this.MessageStore.message_obj.messagesList.length)

                }).catch(error => {
                    console.error(error);
                });
            }
        },
        scrollToElement() {
            const container = this.$el.querySelector("#chat-container");
            console.log("scrolling");
            container.scrollTop = container.scrollHeight;
            return;
        },
    }
}
</script>
<template>
    <div class="h-screen">
        <div class="flex flex-col mx-auto w-6/7 h-5/6 bg-white rounded-lg shadow-lg">
            <div id="chat-container" class="flex-grow mt-10 overflow-scroll">
                <div v-for="message in MessageArray">
                    <div v-if="message.role == 'user'" class="mb-10">
                        <userMessage :data="message.value" />
                    </div>
                    <div v-else>
                        <aiMessage :data="message.value" class="mb-10" />
                    </div>
                </div>
                <div v-if="streaming == true">
                    <streamMessage :data="streamMessage" class="mb-10" />
                </div>

            </div>
            <div class="pl-10 pr-10 pb-10 pt-10">
                <div class="flex">
                    <Input id="message" type="text" placeholder="ถามคำถาม..." v-model="newMessage" />
                    <Button class="ml-2" @click="submit_message()">
                        <Icon icon="iconoir:send" size="1.4em" />
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>
<style></style>