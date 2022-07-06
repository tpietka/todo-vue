<script setup lang="ts">
defineProps<{
  counter: number;
}>();
</script>

<template>
  <div class="rounded-full border-2 dark:border-slate-100 border-slate-800 w-8 h-8">
    <div
      class="counter flex justify-center items-center self-center h-full text-lg font-medium"
    >
      {{ counter }}
    </div>
  </div>
</template>
