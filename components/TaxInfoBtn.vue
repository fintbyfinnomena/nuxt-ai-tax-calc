<template>
  <Button
    variant="outline"
    class="bg-primary text-white lg:mb-0 rounded-full border border-primary hover:text-primary hover:bg-transparent"
    :data-fn-location="location"
    data-fn-action="allocation-param-modal_open"
    @click="openModal"
  >
    <Icon icon="iconoir:page-edit" size="1.4em" class="mr-2" />
    ระบุข้อมูลลดหย่อนภาษี
  </Button>
</template>
<script>
import { useMessageStore } from "../stores/MessageStore";
export default {
  props: ["location"],
  created() {
    this.MessageStore = useMessageStore();
  },
  methods: {
    openModal() {
      this.MessageStore.modal = true;
    },
  },
};
</script>
