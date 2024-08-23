<template>
  <div class="w-full mx-auto">
    <div
      class="flex flex-col mx-auto bg-white rounded-lg shadow-lg overflow-scroll"
    >
      <div class="flex flex-grow justify-center items-center mt-20 mb-9">
        <img id="logo" src="../assets/img/chat-logo.png" alt="" />
      </div>
      <div class="p-5 pb-0 md:p-10 md:pb-0">
        <div
          v-for="(question, index) in MessageStore.Questions"
          :key="index"
          @click="SelectQuestion(question.option)"
          class="bg-white rounded-lg mb-4 p-5 border flex justify-between items-center border-gray-200 cursor-pointer hover:bg-gray-100"
          data-fn-location="intro"
          data-fn-action="template-prompt_click"
          :data-fn-params="`{
                    'prompt' : '${question.prompt}'
                    }`"
        >
          <div>
            <h3 class="text-sm md:text-lg font-bold">{{ question.title }}</h3>
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
  props: ["data"],
  data() {
    return {
      MessageStore: null,
    };
  },
  created() {
    this.MessageStore = useMessageStore();
  },
  methods: {
    async SelectQuestion(value) {
      this.MessageStore.SetstartingOption(value);
      await navigateTo("/charlie/chat");
    },
  },
};
</script>
<style>
#logo {
  width: 25vh;
  height: 25vh;
}
</style>
