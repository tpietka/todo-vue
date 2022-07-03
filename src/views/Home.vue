<script setup lang="ts">
import { onBeforeMount, ref, toRefs } from 'vue';
import TodoList from '../components/TodoList.vue';
import { useTodos } from '../stores/todos';
import TodosCounter from '../components/TodosCounter.vue';
import CustomButton from '../components/CustomButton.vue';
const { todos, awaitingTodosCount, doneTodosCount } = toRefs(useTodos());
const { getTodos } = useTodos();
onBeforeMount(() => {
  getTodos();
});
</script>
<template>
  <div class="flex gap-2 mx-auto">
    <todos-counter :counter="awaitingTodosCount" :done="false"></todos-counter>
    <todos-counter :counter="doneTodosCount" :done="true"></todos-counter>
  </div>
  <div class="mt-24">
    <todo-list :todos="todos"></todo-list>
  </div>
  <custom-button
    classes="fixed bg-green-500 text-white py-4 flex justify-center bottom-0 w-full border-t border-black"
    id="btn-add-todo"
    routeName="NewTodoForm"
    label="Add Todo"
  ></custom-button>
</template>
<style scoped></style>
