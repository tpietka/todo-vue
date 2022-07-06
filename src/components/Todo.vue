<script setup lang="ts">
import { computed } from 'vue';
import { getCurrentDateWithoutTime, getDateWithoutTime } from '../helpers/date';
import { Todo } from '../models/todo';
import TodoButtons from './TodoButtons.vue';

const props = defineProps<{
  todo: Todo;
}>();

const isDeadlineToday = computed(() => {
  return getCurrentDateWithoutTime() >= getDateWithoutTime(props.todo.deadline);
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
          todo.done ? 'opacity-60' : 'opacity-100',
          'text-sm flex items-center gap-2',
        ]"
      >
        <span class="material-icons md-18"> schedule </span> {{ todo.deadline }}
      </div>
    </div>
    <todo-buttons :id="todo.id" :done="todo.done"></todo-buttons>
  </div>
</template>
