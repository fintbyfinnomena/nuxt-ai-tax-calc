<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk: string | undefined) => {
    return titleChunk
      ? `${titleChunk} - Charlie - คู่คิด จัดพอร์ต กองทุนภาษี จาก Finnomena`
      : "Charlie - คู่คิด จัดพอร์ต กองทุนภาษี จาก Finnomena";
  },
  meta: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, maximum-scale=1",
    },
  ],
});
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
