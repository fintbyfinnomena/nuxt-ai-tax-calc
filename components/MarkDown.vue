<template>
  <div class="md-element" v-html="componentString"></div>
</template>
<script>
import { useMessageStore } from "../stores/MessageStore";
import { nextTick } from "vue";
export default {
  props: ["val"],
  data() {
    return {
      MessageStore: null,
      componentString: this.val,
    };
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
};
</script>
<style lang="scss">
.md-element {
  ol,
  ul {
    list-style-type: disc;
    padding-left: 1.5em;
  }
  strong {
    font-size: 1em;
  }
  a {
    text-decoration: underline;
    font-weight: bold;
  }
  h1 {
    font-size: 1.125rem; /* 18px */
    line-height: 1.75rem;
    font-weight: bold;
    margin-top: 1.25rem;
  }
  h2,
  h3 {
    font-size: 1.15rem; /* 16px */
    line-height: 1.5rem;
    font-weight: bold;
    margin-top: 1rem;
  }
  p {
    margin-top: 10px;
  }
  table {
    background-color: white;
    margin-top: 1rem;
    td {
      padding: 0.5rem;
    }
  }
}
</style>
