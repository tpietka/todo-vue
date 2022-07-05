<script setup lang="ts">
import { computed } from 'vue';
import { Todo } from '../models/todo';
import TodoComponent from './Todo.vue';

const props = defineProps<{
  todos: Todo[];
}>();

const awaitingTodos = computed(() => {
  return props.todos.filter((item) => {
    return !item.done;
  });
});

const doneTodos = computed(() => {
  return props.todos.filter((item) => {
    return item.done;
  });
});
</script>

<template>
  <div class="mx-6 my-3" v-for="todo in awaitingTodos" :key="todo.id">
    <todo-component :todo="todo"></todo-component>
  </div>
  <div class="mx-6 my-3" v-for="todo in doneTodos" :key="todo.id">
    <todo-component class="opacity-60" :todo="todo"></todo-component>
  </div>
</template>
