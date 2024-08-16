<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk: string | undefined) => {
    return titleChunk
      ? `${titleChunk} - Charlie - Your Tax Companion`
      : "Charlie - Your Tax Companion";
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
