<script setup lang="ts">
import { computed } from 'vue';
import { getCurrentDate, formatDateToYYYYMMDD } from '../helpers/date';
import { Todo } from '../models/todo';
import TodoButtons from './TodoButtons.vue';
import TodoDate from './TodoDate.vue';

const props = defineProps<{
  todo: Todo;
}>();

const isDeadlineToday = computed(() => {
  return getCurrentDate() >= formatDateToYYYYMMDD(props.todo.deadline);
});
</script>

<template>
  <div class="flex justify-between gap-2 items-center">
    <div :class="[todo.done ? 'opacity-60' : 'opacity-100', 'font-bold text-xl']">
      {{ todo.title }}
      <div
        v-if="todo.deadline"
        :class="[
          isDeadlineToday && !todo.done
            ? 'text-red-500'
            : 'dark:text-slate-100 text-slate-800',
          'text-sm flex items-center gap-1',
        ]"
      >
        <todo-date
          v-if="!todo.done"
          icon-name="schedule"
          :date="todo.deadline"
        ></todo-date>
        <todo-date v-else icon-name="task_alt" :date="todo.completed"></todo-date>
      </div>
    </div>
    <todo-buttons :id="todo.id" :done="todo.done"></todo-buttons>
  </div>
</template>
