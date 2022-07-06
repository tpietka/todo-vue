<script setup lang="ts">
import { onBeforeMount, ref, toRefs } from 'vue';
import TodoList from '../components/TodoList.vue';
import { useTodos } from '../stores/todos';
import TodosCounter from '../components/TodosCounter.vue';
import CustomButton from '../components/CustomButton.vue';
import { getCurrentDayName, getCurrentDateWithoutTime } from '../helpers/date';
const { todayTodos, nextDaysTodos, doneTodos } = toRefs(useTodos());
const { getTodos } = useTodos();
onBeforeMount(() => {
  getTodos();
});
</script>
<template>
  <div class="text-right mx-6 flex-col">
    <div class="text-2xl">{{ getCurrentDayName() }}</div>
    <div>{{ getCurrentDateWithoutTime() }}</div>
  </div>
  <div class="hidden md:flex md:justify-center md:my-12">
    <custom-button
      classes="bg-green-500 text-white py-4 flex justify-center bottom-0 w-full md:w-48"
      id="btn-add-todo"
      routeName="NewTodoForm"
      label="Add Todo"
    ></custom-button>
  </div>
  <div class="my-12 mx-6 md:mx-auto md:my-0">
    <todo-list
      label="Today"
      :todos="todayTodos"
      no-todos-message="You have no todos planned for today"
    ></todo-list>
    <todo-list
      label="Next days"
      :todos="nextDaysTodos"
      no-todos-message="You have no todos planned for next days"
    ></todo-list>
    <todo-list
      label="Done"
      :todos="doneTodos"
      no-todos-message="You have no done todos"
    ></todo-list>
  </div>
  <div class="flex md:hidden fixed justify-center bottom-0 w-full">
    <custom-button
      classes="bg-green-500 text-white py-4 flex justify-center w-full"
      id="btn-add-todo"
      routeName="NewTodoForm"
      label="Add Todo"
    ></custom-button>
  </div>
</template>
<style scoped></style>
