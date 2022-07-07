<script setup lang="ts">
import { useTodos } from '../stores/todos';
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps<{
  id: number;
  done: boolean;
}>();

const { markDone, deleteTodo } = useTodos();
const editTodo = () => {
  router.push({ name: 'EditTodoForm', params: { id: props.id } });
};
</script>

<template>
  <div class="flex items-center h-10 gap-2">
    <span v-if="!done" class="material-icons cursor-pointer md-24" @click="markDone(id)"
      >done</span
    >
    <span v-if="!done" class="material-icons cursor-pointer md-24" @click="editTodo"
      >edit</span
    >
    <span class="material-icons cursor-pointer md-24" @click="deleteTodo(id)"
      >delete</span
    >
  </div>
</template>
