<script setup lang="ts">
import { useTodos } from '../stores/todos';
import { useRouter } from 'vue-router';
import { isDeadlineTodayOrPastDeadline } from '../helpers/date';
import { Todo } from '../models/todo';
const router = useRouter();

const props = defineProps<{
  todo: Todo;
}>();

const { setDone, deleteTodo, setNotDone, archiveTodo, moveTodo } = useTodos();
const editTodo = () => {
  router.push({ name: 'EditTodoForm', params: { id: props.todo.id } });
};
</script>

<template>
  <div class="flex items-center gap-2">
    <template v-if="!todo.archived">
      <span
        v-if="!todo.done"
        class="material-icons cursor-pointer lg-24"
        @click="setDone(todo.id)"
        >done</span
      >
      <span
        v-if="!todo.done && !isDeadlineTodayOrPastDeadline(todo.deadline)"
        class="material-icons cursor-pointer lg-24"
        @click="moveTodo(todo.id, 'Today')"
        >priority_high</span
      >
      <span
        v-if="!todo.done && isDeadlineTodayOrPastDeadline(todo.deadline)"
        class="material-icons cursor-pointer lg-24"
        @click="moveTodo(todo.id, 'Next days')"
        >low_priority</span
      >
      <span
        v-if="!todo.done"
        class="material-icons cursor-pointer lg-24"
        @click="editTodo"
        >edit</span
      >
      <span
        v-if="todo.done"
        class="material-icons cursor-pointer lg-24"
        @click="setNotDone(todo.id)"
        >undo</span
      >
      <span
        v-if="todo.done"
        class="material-icons cursor-pointer lg-24"
        @click="archiveTodo(todo.id)"
        >inventory</span
      >
    </template>
    <span class="material-icons cursor-pointer lg-24" @click="deleteTodo(todo.id)"
      >delete</span
    >
  </div>
</template>
