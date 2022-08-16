<script setup lang="ts">
import { Task } from '../models/todo';

defineProps<{
  tasks: Task[];
}>();
const emit = defineEmits(['update-task']);

const updateTask = (index: number, value: boolean) => {
  emit('update-task', index, value);
};
</script>

<template>
  <div v-if="tasks.length > 0" class="flex-col justify-between items-center py-2">
    <div
      v-for="(task, index) in tasks"
      :key="index"
      class="leading-tight text-xl text-slate-400 flex items-center gap-3"
    >
      <label :for="`task-done-${index}`" v-if="!task.done" class="material-icons">
        radio_button_unchecked
      </label>
      <label :for="`task-done-${index}`" v-else class="material-icons"> task_alt </label>
      <input
        hidden
        type="checkbox"
        @change="updateTask(index, task.done)"
        :id="`task-done-${index}`"
        v-model="task.done"
      />
      <label class="text-sm" :for="`task-done-${index}`">{{ task.title }}</label>
    </div>
  </div>
</template>
