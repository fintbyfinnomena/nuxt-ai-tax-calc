<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk: string | undefined) => {
    return titleChunk
      ? `${titleChunk} - TAXi - Your Tax Companion`
      : "TAXi - Your Tax Companion";
  },
});
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
