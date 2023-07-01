<script setup lang="ts">
defineProps<{
  class: string;
}>()
</script>

<template>
  <button
    class="bg-pink-800 text-white py-2 px-8 rounded-md font-bold"
    :class="class"
  >
    <slot />
  </button>
</template>