<template>
  <div class="inline flex overflow-x-auto">
    <div v-for="(elem, index) in parsedComponents" :key="index">
      <div v-if="elem.tags == 'fund-click'" class="inline">
        <fund-click :shortcode="elem.value" />
      </div>
      <div v-else-if="elem.tags == 'fund-card'">
        <fund-card :shortcode="elem.value" />
      </div>
      <div v-else-if="elem.tags == 'fund-port'">
        <fund-port :port="elem.value" />
      </div>
      <div v-else-if="elem.tags == 'prompt-click-list'" class="inline">
        <prompt-click-list :prompt="elem.value" />
      </div>
      <div class="info-modal" v-else-if="elem.tags == 'info-modal'">
        <TaxInfoBtn location="chat" />
      </div>
      <div v-else-if="elem.tags == 'info-change'">
        <info-change :value="elem.value" />
      </div>
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
      components: this.renderVal,
      parsedComponents: [],
      tags: "",
      value: "",
    };
  },
  created() {
    this.MessageStore = useMessageStore();
  },
  mounted() {
    this.components.forEach((element) => {
      this.parsedComponents.push({
        componentString: element,
        tags: this.GetTag(element.value),
        value: this.GetValue(element.value),
      });
    });
    this.updateScroll();
  },
  methods: {
    GetTag(tags) {
      const extractedTag = tags.match(/<([^>]+)>/)[1];
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
