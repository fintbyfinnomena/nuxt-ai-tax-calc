<template class="display-inline">
  <div class="display-inline">
    <p class="text-gray-500 dark:text-gray-400">
      <a
        href="#"
        @click="populate()"
        class="inline-flex items-center font-bold text-primary underline"
        data-fn-location="chat"
        data-fn-action="fund-info-prompt_click"
        :data-fn-params="`{
                'fund' : '${shortcode}'
                }`"
      >
        {{ shortcode }}
        <svg
          class="w-4 h-4 ms-2 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>
    </p>
  </div>
</template>
<script>
import { useMessageStore } from "../../stores/MessageStore";
export default {
  props: ["shortcode"],
  data() {
    return {
      MessageStore: null,
      ReqString: `ขอข้อมูลกองทุน ${this.shortcode}`,
    };
  },
  created() {
    this.MessageStore = useMessageStore();
    // console.log(this.MessageStore.Questions);
  },
  methods: {
    populate() {
      if (
        this.MessageStore.msgSent == false &&
        this.MessageStore.streaming == false
      ) {
        console.log("Populating");
        this.MessageStore.setAutoMsg(this.ReqString);
      }
    },
  },
};
</script>
