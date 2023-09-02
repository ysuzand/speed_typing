<script setup lang="ts">
import {
	ref,
	onUnmounted,
	watch,
	reactive,
	computed,
	watchEffect
} from 'vue'
const props = withDefaults(defineProps<{
	startTimer: boolean;
}>(), {
	startTimer: false
})
const seconds = ref(0);
const secondsTens = ref(3);

let timer: ReturnType<typeof setInterval>;
const startTimer = () => {
	timer = setInterval(() => {
		seconds.value--
	}, 1000)
};
const timeKeeper = computed(() => `${secondsTens.value}${seconds.value}`);

watchEffect(() => {
	if (props.startTimer) {
		startTimer()
	} else {
		seconds.value = 0;
		secondsTens.value = 3;
	}
})
watch(seconds, (newValue) => {
	if (newValue === -1 ) {
		seconds.value = 9
		secondsTens.value--
	}
})
const emit = defineEmits(['gameOver']);
watch([secondsTens, seconds], ([tensNew, secondsNew]) => {
	if (tensNew === 0 && secondsNew=== 0) {
		clearInterval(timer);
		emit('gameOver');
	}
})
onUnmounted(() => {
	clearInterval(timer)
});
</script>
<template>
	<div>
		<div class="flex gap-1 justify-end mb-2">
			<button type="button" @click="secondsTens = 3" class="border border-solid border-gray-300 rounded-md py-2 px-4">30 sec</button>
			<button type="button" @click="secondsTens = 6" class="border border-solid border-gray-300 rounded-md py-2 px-4">60 sec</button>
			<button type="button" @click="secondsTens = 12" class="border border-solid border-gray-300 rounded-md py-2 px-4">120 sec</button>
		</div>
		<div
			class="flex justify-center gap-2 text-2xl border-2 border-solid border-gray-300 rounded-md py-4 px-8">
			<v-icon name="md-timer-outlined" scale="1.75"/>
			<div class="w-8">{{!startTimer ? 'ready' : timeKeeper}}</div>
		</div>
	</div>
</template>