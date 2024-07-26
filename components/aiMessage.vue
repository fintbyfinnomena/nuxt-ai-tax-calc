<script>
import { useMessageStore } from "../stores/MessageStore";

export default {
    props: ['data'],
    data() {
        return {
            SplittedArray: [],
            MessageStore: null,
            RenderObjectArray: []
        }
    },
    created() {
        this.MessageStore = useMessageStore();
    },
    mounted() {
        // console.log(this.data);
        this.SplittedArray = this.GenerateArray(this.data);
        this.GenerateRenderObject();
    },
    methods: {
        GenerateArray(str) {
            const tagRegex = /(<\/?[^>]+>)/g;
            const parts = str.split(tagRegex).filter(part => part.trim() !== "");
            const result = [];

            let buffer = '';
            let insideTag = false;

            for (const part of parts) {
                if (part.startsWith('<') && !insideTag) {
                    if (buffer.trim()) {
                        result.push(buffer.trim());
                    }
                    buffer = part;
                    insideTag = true;
                } else if (insideTag) {
                    buffer += part;
                    if (part.endsWith('>')) {
                        result.push(buffer.trim());
                        buffer = '';
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
                        <span class="text-sm font-semibold text-gray-900 dark:text-white">Charlie</span>
                    </div>
                    <div v-for="item in RenderObjectArray" :key="item.index">
                        <div v-if="item.type === 'text'">
                            <div class="text-sm font-normal whitespace-pre-wrap py-2.5 text-gray-900 dark:text-white">{{
                                item.value }}</div>
                        </div>
                        <div v-else-if="item.type === 'render'">
                            <div class="text-sm font-normal py-2.5 text-gray-900 bg-gray-50">{{ item.value }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style></style>