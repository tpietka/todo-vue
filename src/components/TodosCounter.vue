<script setup lang="ts">
defineProps<{
  counter: number;
  className: string;
}>();
</script>

<template>
  <div :class="[className, 'rounded-full', 'border-2', 'mx-auto', 'w-16', 'h-16']">
    <div
      class="counter flex justify-center items-center self-center h-full text-2xl font-medium"
    >
      {{ counter }}
    </div>
  </div>
</template>

<style>
.awaiting {
  border-color: orange;
}
.deadline {
  border-color: red;
}
.done {
  border-color: green;
}
</style>
