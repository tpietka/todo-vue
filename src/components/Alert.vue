<script setup lang="ts">
import { useAlerts } from '../stores/alerts';
import { computed, toRefs } from 'vue';

const { message, display, type } = toRefs(useAlerts());
const color = computed(() => {
  if (type.value === 'warning') {
    return 'dark:bg-yellow-400 bg-yellow-400';
  } else if (type.value === 'negative') {
    return 'dark:bg-red-500 bg-red-500';
  } else {
    return 'dark:bg-green-500 bg-green-500';
  }
});
</script>

<template>
  <div class="w-full flex justify-center">
    <div
      v-if="display"
      :class="[
        color,
        'fixed z-50 h-10 flex justify-center items-center font-bold text-slate-800 dark:text-slate-800 top-0 w-full lg:w-1/4',
      ]"
    >
      {{ message }}
    </div>
  </div>
</template>
