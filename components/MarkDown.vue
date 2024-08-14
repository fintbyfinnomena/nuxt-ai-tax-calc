<template>
    <div v-html="componentString"></div>
</template>
<script>
import { useMessageStore } from "../stores/MessageStore";
import { nextTick } from "vue";
export default {
    props: ['val'],
    data() {
        return {
            MessageStore: null,
            componentString: this.val,
        }
    },
    created() {
        this.MessageStore = useMessageStore();
    }, 
    mounted() {
        this.updateScroll();
    },
    methods: {
        async updateScroll() {
            await nextTick();
            this.MessageStore.Rendered = true;
        },
    },
}
</script>
<style>
    
li {
    line-height: 1.5em;
    list-style-type: disc;
    margin: 0;
    margin-left: 10px;
}

ol,
ul {
    margin: 0;
    padding: 0;
    line-height: 1em;
}
strong {
    font-size: 1.2em;
}
</style>