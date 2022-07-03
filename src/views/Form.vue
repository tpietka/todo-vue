<script setup lang="ts">
import { ref } from 'vue';
import { Todo } from '../models/todo';
import { useTodos } from '../stores/todos';
import InputLabel from '../components/InputLabel.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { addTodo } = useTodos();
let form = ref({} as Todo);

const submit = async () => {
  addTodo(form.value);
  await router.push('/');
};
const goBack = () => {
  router.back();
};
</script>
<template>
  <h1 class="text-xl pb-10">Todo details</h1>
  <div class="w-full px-8 pb-8">
    <input-label label="Title"></input-label>
    <input class="w-full h-10" type="text" v-model="form.title" />
  </div>
  <div class="w-full px-8 pb-8">
    <input-label label="Description"></input-label>
    <textarea class="w-full" rows="4" v-model="form.text" />
  </div>
  <div class="w-full px-8 pb-8">
    <input-label label="Deadline"></input-label>
    <input class="w-full h-10" type="text" v-model="form.deadline" />
  </div>
  <div class="fixed flex justify-center bottom-0 w-full border-t border-black">
    <button
      class="h-full py-4 w-full bg-green-500 text-white"
      @click="submit"
      id="save-todo"
    >
      Save
    </button>
    <button class="h-full py-4 w-full bg-red-500 text-white" @click="goBack" id="go-back">
      Go Back
    </button>
  </div>
</template>

<style scoped>
input,
textarea {
  background-color: #dfdfdf;
}
</style>
