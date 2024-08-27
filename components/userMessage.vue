<script>
import { useMessageStore } from "../stores/MessageStore";
import { useUser } from "../stores/UserStore";

export default {
  props: ["data"],
  data() {
    return {
      MessageStore: null,
      UserStore: null,
    };
  },
  created() {
    this.MessageStore = useMessageStore();
    this.UserStore = useUser();
  },
};
</script>
<template>
  <div class="flex justify-end">
    <div
      class="flex flex-col w-auto max-w-[250px] sm:max-w-[280px] md:max-w-[450px] lg:max-w-[600px] xl:max-w-[800px] px-4 border-gray-200 bg-gray-100 rounded-xl rounded-se-none dark:bg-gray-700"
    >
      <p
        class="text-sm font-normal whitespace-pre-line py-2.5 text-gray-900 dark:text-white"
      >
        {{ data }}
      </p>
    </div>
    <img
      class="w-8 h-8 rounded-full mr-7 ml-2"
      :src="this.UserStore.user.imageURL"
      alt="Finnomena Icon"
    />
  </div>
</template>
<style></style>
