<script setup lang="ts">
import { Task } from '../models/todo';

const props = defineProps<{
  tasks: Task[];
}>();

const updateTasks = (index: number) => {
  props.tasks.splice(index, 1);
  return props.tasks;
};
</script>

<template>
  <div v-if="tasks.length > 0" class="flex flex-col mt-4 gap-2">
    <div
      class="p-2 bg-slate-800 flex w-full items-center justify-between gap-2"
      v-for="(task, index) in tasks"
      :key="index"
    >
      <span>{{ task.title }}</span>
      <span
        class="material-icons not-selectable cursor-pointer"
        @click="$emit('update:modelValue', updateTasks(index))"
        >cancel</span
      >
    </div>
  </div>
</template>
