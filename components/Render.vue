<template>
  <div class="inline">
    <div v-if="tags == 'fund-click'" class="inline">
      <fund-click :shortcode="value" />
    </div>
    <div v-else-if="tags == 'fund-card'">
      <fund-card :shortcode="value" />
    </div>
    <div v-else-if="tags == 'fund-port'">
      <fund-port :port="value" />
    </div>
    <div v-else-if="tags == 'prompt-click-list'" class="inline">
      <prompt-click-list :prompt="value" />
    </div>
    <div class="info-modal" v-else-if="tags == 'info-modal'">
      <TaxInfoBtn location="chat" />
    </div>
    <div v-else-if="tags == 'info-change'">
      <info-change :value="value" />
    </div>
  </div>
</template>
<script>
import { useMessageStore } from "../stores/MessageStore";
import { nextTick } from "vue";
export default {
  props: ["renderVal"],
  data() {
    return {
      MessageStore: null,
      componentString: this.renderVal,
      tags: "",
      value: "",
    };
  },
  created() {
    this.MessageStore = useMessageStore();
  },
  mounted() {
    this.value = this.GetValue(this.componentString);
    this.tags = this.GetTag(this.componentString);
    this.updateScroll();
  },
  methods: {
    GetTag(tags) {
      const extractedTag = tags.match(/<([^>]+)>/)[1];
      // console.log(extractedTag)
      return extractedTag;
    },
    GetValue(tags) {
      const extractedValue = tags.match(/>([^<]+)</)[1];
      return extractedValue;
    },
    async updateScroll() {
      await nextTick();
      this.MessageStore.Rendered = true;
    },
  },
};
</script>
<style scoped>
.info-modal {
  margin-top: 10px;
}
</style>
