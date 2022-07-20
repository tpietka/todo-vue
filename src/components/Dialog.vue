<script setup lang="ts">
defineProps<{
  display: boolean;
  message: string;
}>();
</script>

<template>
  <div class="fixed z-50 top-0 left-0 first-letter:h-screen w-screen" v-if="display">
    <div
      class="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center"
    >
      <div
        class="h-10 flex justify-center items-center font-bold text-slate-800 dark:text-slate-300 top-0 w-full lg-full"
      >
        {{ message }}
      </div>
      <div class="flex gap-4">
        <slot></slot>
      </div>
    </div>
    <div class="z-40 w-screen h-screen bg-gray-900 opacity-95"></div>
  </div>
</template>
