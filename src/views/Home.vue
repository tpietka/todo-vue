<script setup lang="ts">
import { onBeforeMount, ref, toRefs } from 'vue';
import TodoList from '../components/TodoList.vue';
import { useTodos } from '../stores/todos';
import TodosCounter from '../components/TodosCounter.vue';
import CustomButton from '../components/CustomButton.vue';
const { todos, awaitingTodosCount, doneTodosCount, deadlineTodosCount } = toRefs(
  useTodos()
);
const { getTodos } = useTodos();
onBeforeMount(() => {
  getTodos();
});
</script>
<template>
  <div class="md:flex-col">
    <div class="flex md:justify-center md:mx-auto md:w-1/2">
      <todos-counter :counter="deadlineTodosCount" className="deadline"></todos-counter>
      <todos-counter :counter="awaitingTodosCount" className="awaiting"></todos-counter>
      <todos-counter :counter="doneTodosCount" className="done"></todos-counter>
    </div>
    <div class="mt-24 md:mt-48 md:mx-auto mb-24 md:w-1/3">
      <todo-list v-if="todos.length > 0" :todos="todos"></todo-list>
      <div v-else>You do not have any todos.</div>
    </div>
    <div class="flex fixed bottom-0 md:relative md:justify-center w-full">
      <custom-button
        classes="bg-green-500 text-white py-4 flex justify-center bottom-0 w-full md:w-48"
        id="btn-add-todo"
        routeName="NewTodoForm"
        label="Add Todo"
      ></custom-button>
    </div>
  </div>
</template>
<style scoped></style>
