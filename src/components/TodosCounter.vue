<script setup lang="ts">
defineProps<{
  counter: number;
  done: boolean;
}>();
</script>

<template>
  <div
    :class="[
      done ? 'done' : 'awaiting',
      'rounded-full',
      'border-2',
      'mx-auto',
      'w-10',
      'h-10',
    ]"
  >
    <div
      class="counter flex justify-center items-center self-center h-full text-lg font-medium"
    >
      {{ counter }}
    </div>
  </div>
</template>

<style>
.awaiting {
  border-color: orange;
}
.done {
  border-color: green;
}
</style>
