<script setup lang="ts">
import {ref, onUnmounted, watch, computed} from 'vue'
const props = withDefaults(defineProps<{
    startTimer: boolean;
}>(), {
    startTimer: false
})
const seconds = ref(0);
const secondsTens = ref(0);

let timer: ReturnType<typeof setInterval>;
const startTimer = () => {
    timer = setInterval(() => {
        seconds.value++
    }, 1000)
};
const timeKeeper = computed(() => `${secondsTens.value}${seconds.value}`)
watch(props, (newValue) => {
    if (props.startTimer) {
        startTimer()
    }
})
watch(seconds, (newValue) => {
    if (newValue === 10 ) {
        secondsTens.value++
        seconds.value = 0
    }
})
watch(secondsTens, (newValue) => {
    if (newValue === 3) {
        clearInterval(timer)
    }
})
onUnmounted(() => {
    clearInterval(timer)
});
</script>
<template>
    <div class="flex justify-center gap-2 text-2xl border-2 border-solid border-gray-300 rounded-md py-4 px-8">
        <v-icon name="md-timer-outlined" scale="1.75"/>
        <div class="w-8">{{!startTimer ? 'ready' : timeKeeper }}</div>
    </div>
</template>