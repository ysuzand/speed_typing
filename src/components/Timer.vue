<script setup lang="ts">
defineProps<{
    startTimer: boolean;
}>()
</script>
<template>
    <div class="text-2xl">
        <v-icon name="md-timer-outlined" scale="1.75"/>Timer {{startTimer ? 'start' : 'ready'}}
    </div>
</template>