<template class="inline">
  <p class="text-gray-500 dark:text-gray-400">
    <li>
      <a
        href="#"
        @click="populate()"
        class="inline-flex items-center text-primary text-sm underline list-disc list-outside"
      >
        {{ prompt }}
      </a>
    </li>
  </p>
</template>
<script>
import { useMessageStore } from "../../stores/MessageStore";
export default {
  props: ["prompt"],
  data() {
    return {
      MessageStore: null,
      ReqString: `${this.prompt}`,
    };
  },
  created() {
    this.MessageStore = useMessageStore();
  },
  methods: {
    populate() {
      if (
        this.MessageStore.msgSent == false &&
        this.MessageStore.streaming == false
      ) {
        this.MessageStore.setAutoMsg(this.ReqString);
      }
    },
  },
};
</script>

<style scoped>
li {
  list-style-type: disc;
}

li::marker {
  color: black;
}
</style>
