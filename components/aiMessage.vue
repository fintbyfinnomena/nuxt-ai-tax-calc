<script>
import { useMessageStore } from "../stores/MessageStore";
import { useAuthStore } from "../stores/AuthStore";
import fundcard from "./render/fund-card.vue";

export default {
    props: ['data', 'feedback'],
    data() {
        return {
            SplittedArray: [],
            MessageStore: null,
            AuthStore: null,
            RenderObjectArray: [],
            config: null
        }
    },
    created() {
        this.MessageStore = useMessageStore();
        this.AuthStore = useAuthStore();
        this.config = useRuntimeConfig();
    },
    mounted() {
        // console.log(this.data);
        this.SplittedArray = this.GenerateArray(this.data);
        this.GenerateRenderObject();
        this.ArrangeRenderObject();
    },
    methods: {
        GenerateArray(str) {
            const tagRegex = /(<\/?[^>]+>)/g;
            const parts = str.split(tagRegex).filter(part => part.trim() !== "");
            const result = [];

            let buffer = "";
            let insideTag = false;

            for (const part of parts) {
                if (part.startsWith("<") && !insideTag) {
                    if (buffer.trim()) {
                        result.push(buffer.trim());
                    }
                    buffer = part;
                    insideTag = true;
                } else if (insideTag) {
                    buffer += part;
                    if (part.endsWith(">")) {
                        result.push(buffer.trim());
                        buffer = "";
                        insideTag = false;
                    }
                } else {
                    buffer += part;
                }
            }

            if (buffer.trim()) {
                result.push(buffer.trim());
            }

            return result;
        },
        GenerateRenderObject() {
            this.SplittedArray.forEach((element) => {
                if (element.startsWith('<')) {
                    this.RenderObjectArray.push({
                        index: this.MessageStore.message_obj.index,
                        role: 'ai',
                        type: 'render',
                        value: element
                    });
                } else {
                    this.RenderObjectArray.push({
                        index: this.MessageStore.message_obj.index,
                        role: 'ai',
                        type: 'text',
                        value: element
                    });
                }
            });
        },
        ArrangeRenderObject() {
            const fundCardElements = this.RenderObjectArray.filter(item => item.value.startsWith('<fund-card>'));
            const nonFundCardElements = this.RenderObjectArray.filter(item => !item.value.startsWith('<fund-card>'));
            this.RenderObjectArray = [...nonFundCardElements, ...fundCardElements];
        },
        downvote() {
            fetch(`${this.config.public.url.serviceUrl}/api/v1/langchain-chat/chats/${this.AuthStore.user_obj.chatid}/thumb-down`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ index: this.feedback })
            })
                .then(response => response.json())
                .then(data => {
                    // Handle the response data
                    console.log(data)
                    this.MessageStore.message_obj.messagesList[this.feedback].downvote = true;
                })
                .catch(error => {
                    // Handle any errors
                    console.error(error);
                });
        }
    }
}
</script>
<template>
    <div>
        <div>
            <div class="flex items-start gap-2.5">
                <img class="w-8 h-8 rounded-full mr-2 ml-5" src="../assets/img/logo.png" alt="Finnomena Icon">
                <div
                    class="flex flex-col w-full max-w-[800px] leading-1.5 p-4 border-gray-200 bg-gradient-to-r from-finnopurple to-finnoblue rounded-e-xl rounded-es-xl dark:bg-gray-700">
                    <div class="flex items-center space-x-2 rtl:space-x-reverse">
                        <span class="text-sm font-semibold text-gray-900 dark:text-white">TAXi</span>
                    </div>
                    <div v-for="item in RenderObjectArray" :key="item.index">
                        <div v-if="item.type === 'text'">
                            <div class="text-sm font-normal whitespace-pre-wrap py-2.5 text-gray-900 dark:text-white">{{
                                item.value }}</div>
                        </div>
                        <div v-else-if="item.type === 'render'">
                            <Render :renderVal="item.value" />
                        </div>
                    </div>
                    <div v-if="this.MessageStore.message_obj.messagesList.length > 0">
                        <div v-if="this.MessageStore.message_obj.messagesList[this.feedback].downvote == false"
                            class="mt-5 hover:cursor-pointer" @click="downvote(this.feedback)">
                            <Icon icon="material-symbols:thumb-down-outline-sharp" size="1.4em" />
                        </div>
                        <div v-else class="mt-5">
                            <Icon icon="ic:sharp-thumb-down-alt" size="1.4em" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style></style>