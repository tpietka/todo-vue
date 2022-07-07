<script setup lang="ts">
import { onBeforeMount, toRefs } from 'vue';
import TodoList from '../components/TodoList.vue';
import { useTodos } from '../stores/todos';
import CustomButton from '../components/CustomButton.vue';
const { todayTodos, nextDaysTodos, doneTodos } = toRefs(useTodos());
const { getTodos } = useTodos();
onBeforeMount(() => {
  getTodos();
});
</script>
<template>
  <div
    class="flex fixed justify-center bottom-0 w-full md:relative md:justify-center md:my-12"
  >
    <custom-button
      class="bg-green-700 text-slate-100 font-bold py-2 w-full bottom-0 md:w-48 hover:bg-green-600"
      id="btn-add-todo"
      routeName="NewTodoForm"
      label="Add Todo"
    ></custom-button>
  </div>
  <div class="md:flex md:w-full my-12 mx-6 md:mx-auto md:my-0">
    <todo-list
      class="w-full"
      label="Today"
      :todos="todayTodos"
      no-todos-message="You have no todos planned for today"
    ></todo-list>
    <div
      class="border-b-2 md:border-b-0 md:border-r-2 my-10 md:my-0 md:mx-10 border-slate-800 dark:border-slate-100 h-1 md:h-auto"
    ></div>
    <todo-list
      class="w-full"
      label="Next days"
      :todos="nextDaysTodos"
      no-todos-message="You have no todos planned for next days"
    ></todo-list>
    <div
      class="border-b-2 md:border-b-0 md:border-r-2 my-10 md:my-0 md:mx-10 border-slate-800 dark:border-slate-100 h-1 md:h-auto"
    ></div>
    <todo-list
      class="w-full"
      label="Done"
      :todos="doneTodos"
      no-todos-message="You have no done todos"
    ></todo-list>
  </div>
</template>
