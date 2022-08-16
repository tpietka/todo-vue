<script setup lang="ts">
import { ref } from 'vue';
import { Todo } from '../models/todo';
import { useTodos } from '../stores/todos';
import TodoButtons from './TodoButtons.vue';
import TodoDate from './TodoDate.vue';
import TodoTasks from './TodoTasks.vue';
import TodoTags from './TodoTags.vue';

defineProps<{
  todo: Todo;
}>();

const { updateTask } = useTodos();

let showMore = ref(false);
</script>

<template>
  <div class="flex-col justify-between gap-2 items-center">
    <div class="leading-tight text-xl flex items-center justify-between gap-2">
      <span>{{ todo.title }}</span>
      <span v-if="todo.description" class="flex">
        <span
          @click="showMore = true"
          v-if="!showMore"
          class="material-icons cursor-pointer"
          >expand_more</span
        ><span @click="showMore = false" v-else class="material-icons cursor-pointer"
          >expand_less</span
        >
      </span>
    </div>
    <div v-if="showMore">
      <div class="flex w-full flex-col">
        <todo-tasks
          class="w-full"
          @update-task="(index: number, value: boolean) => updateTask(todo.id, index, value)"
          :tasks="todo.tasks"
        ></todo-tasks>
        <div class="text-md leading-5 py-2 w-full text-slate-400">
          {{ todo.description }}
        </div>
      </div>
      <todo-tags :tags="todo.tags"></todo-tags>
    </div>
    <div class="font-bold flex items-end justify-between text-xl">
      <div :class="[todo.done ? 'bg-transparent' : '', 'flex-col items-center mt-2']">
        <todo-date v-if="!todo.done" :done="todo.done" :date="todo.deadline"></todo-date>
        <todo-date v-else :done="todo.done" :date="todo.completed"></todo-date>
        <div class="flex mt-1 items-center">
          <span
            v-for="n in todo.priority"
            class="text-red-500 material-icons lg-14 priority"
          >
            local_fire_department
          </span>
        </div>
      </div>
      <todo-buttons :todo="todo"></todo-buttons>
    </div>
  </div>
</template>
