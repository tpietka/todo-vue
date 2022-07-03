<script setup lang="ts">
import { onBeforeMount, toRefs } from 'vue';
import TodoList from '../components/TodoList.vue';
import { useTodos } from '../stores/todos';
import TodosCounter from '../components/TodosCounter.vue';
import CustomButton from '../components/CustomButton.vue';
const { todos } = toRefs(useTodos());
const { getTodos } = useTodos();
onBeforeMount(() => {
  getTodos();
});
const awaitingTodosCount = todos.value.filter((item) => {
  return !item.done;
}).length;
const doneTodosCount = todos.value.filter((item) => {
  return item.done;
}).length;
</script>
<template>
  <div class="flex gap-2 mx-auto">
    <todos-counter :counter="awaitingTodosCount" :done="false"></todos-counter>
    <todos-counter :counter="doneTodosCount" :done="true"></todos-counter>
  </div>
  <todo-list :todos="todos"></todo-list>
  <custom-button
    classes="fixed py-8 flex justify-center bottom-0 w-full border-t border-black"
    id="btn-add-todo"
    routeName="NewTodoForm"
    label="Add Todo"
  ></custom-button>
</template>
<style scoped></style>
