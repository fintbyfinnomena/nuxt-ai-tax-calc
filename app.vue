<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk: string | undefined) => {
    return titleChunk
      ? `${titleChunk} - Charlie - แชทบอท AI ผู้แนะนำ SSF RMF ThaiESG`
      : "Charlie - แชทบอท AI ผู้แนะนำ SSF RMF ThaiESG";
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
