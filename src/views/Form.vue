<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import { Task, Todo } from '../models/todo';
import { useTodos } from '../stores/todos';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import InputLabel from '../components/InputLabel.vue';
import DatePicker from '../components/DatePicker.vue';
import ValidationErrorMessage from '../components/ValidationErrorMessage.vue';
import { useValidations } from '../composables/validations';
import { useAlerts } from '../stores/alerts';
import FormButton from '../components/FormButton.vue';
import CustomButton from '../components/CustomButton.vue';
import DialogVue from '../components/Dialog.vue';

const props = defineProps<{
  id?: number | string;
}>();

let displayDialog = ref(false);
let tag = ref('');
let task = ref('');
let form = ref({
  tags: [] as string[],
  tasks: [] as Task[],
} as Todo);
let showDatePicker = ref(false);

const { addTodo, editTodo, getTodo } = useTodos();
onBeforeMount(() => {
  form.value.priority = 1;
  if (props.id) {
    form.value = getTodo(Number(props.id));
  }
});

const addTag = () => {
  if (tag.value.trim()) {
    form.value.tags.push(tag.value.trim());
  }
  tag.value = '';
};

const addTask = () => {
  if (task.value.trim()) {
    form.value.tasks.push({ title: task.value.trim(), done: false });
  }
  task.value = '';
};

const router = useRouter();
const { displayAlert } = useAlerts();
const submit = async (e: Event) => {
  e.preventDefault();
  v.value.$touch();
  if (v.value.$invalid) {
    displayAlert('Errors detected in form', 'warning');
  } else {
    if (props.id) {
      editTodo(Number(props.id), form.value);
    } else {
      addTodo(form.value);
    }
    await router.push('/');
  }
};
const goBack = () => {
  router.back();
};

const { validateDateFormat, validateRequired } = useValidations();
const rules = computed(() => ({
  form: {
    title: { required: validateRequired('Title') },
    deadline: {
      required: validateRequired('Deadline'),
      format: validateDateFormat(),
    },
  },
}));
const v = useVuelidate(rules, { form });
</script>
<template>
  <div class="w-full mt-12 flex-col">
    <h1 class="text-xl pb-10 text-center">{{ $t('message.newTodo') }}</h1>
    <form @submit="submit">
      <div class="w-full lg:px-0 px-8 pb-8 lg:w-96 lg:mx-auto">
        <input-label :label="$t('message.title')"></input-label>
        <input
          class="w-full px-4 bg-slate-300 text-slate-800 h-10"
          type="text"
          v-model="form.title"
        />
        <validation-error-message
          class="mt-1"
          :display-error="v.form.title.$error"
          :error-messages="v.form.title.$errors"
        ></validation-error-message>
      </div>
      <div class="w-full lg:px-0 px-8 pb-8 lg:w-96 lg:mx-auto">
        <input-label :label="$t('message.description')"></input-label>
        <textarea
          class="w-full py-2 px-4 bg-slate-300 text-slate-800"
          rows="4"
          v-model="form.description"
        />
      </div>
      <div class="w-full lg:px-0 px-8 pb-8 lg:w-96 lg:mx-auto">
        <input-label :label="$t('message.tasks')"></input-label>
        <span class="relative flex items-center">
          <input
            class="w-full px-4 bg-slate-300 text-slate-800 h-10"
            type="text"
            v-model="task"
            @change="addTask"
            @keyup.enter="addTask"
          />
          <span
            class="material-icons cursor-pointer absolute not-selectable dark:text-[#141921] mr-2 right-0"
            >add</span
          >
        </span>
        <div v-if="form.tasks.length > 0" class="flex flex-col mt-4 gap-2">
          <div
            class="p-2 bg-slate-800 flex w-full items-center justify-between gap-2"
            v-for="(task, index) in form.tasks"
            :key="index"
          >
            <span>{{ task.title }}</span>
            <span
              class="material-icons not-selectable cursor-pointer"
              @click="form.tasks.splice(index, 1)"
              >cancel</span
            >
          </div>
        </div>
      </div>
      <div class="w-full lg:px-0 px-8 pb-8 lg:w-96 lg:mx-auto">
        <input-label :label="$t('message.tags')"></input-label>
        <input
          class="w-full px-4 bg-slate-300 text-slate-800 h-10"
          type="text"
          v-model="tag"
          @keyup.space="addTag"
          @keyup.enter="addTag"
        />
        <div v-if="form.tags.length > 0" class="flex mt-4 gap-2">
          <div
            class="p-2 flex items-center gap-2 border-2 rounded-xl border-slate-800 dark:border-slate-100"
            v-for="(tag, index) in form.tags"
            :key="index"
          >
            {{ tag }}
            <span
              class="material-icons not-selectable cursor-pointer"
              @click="form.tags.splice(index, 1)"
              >cancel</span
            >
          </div>
        </div>
      </div>
      <div class="w-full lg:px-0 px-8 pb-8 lg:w-96 lg:mx-auto">
        <input-label :label="$t('message.deadline')"></input-label>
        <span class="relative flex items-center">
          <input
            placeholder="YYYY-MM-DD"
            class="w-full px-4 bg-slate-300 text-slate-800 h-10"
            type="text"
            v-model="form.deadline"
          />
          <span
            class="material-icons cursor-pointer absolute not-selectable dark:text-[#141921] mr-2 right-0"
            @click="showDatePicker = true"
            >calendar_month</span
          >
        </span>
        <validation-error-message
          class="mt-1"
          :display-error="v.form.deadline.$error"
          :error-messages="v.form.deadline.$errors"
        >
        </validation-error-message>
      </div>
      <div class="w-full lg:px-0 px-8 pb-8 lg:w-96 lg:mx-auto">
        <input-label :label="$t('message.priority')"></input-label>
        <span
          @click="form.priority = n"
          v-for="n in 5"
          :class="[
            n <= form.priority ? 'text-red-500' : 'text-slate-300',
            'material-icons lg-36 cursor-pointer not-selectable',
          ]"
        >
          local_fire_department
        </span>
      </div>
      <div
        class="fixed lg:relative lg:mt-4 h-14 lg:w-96 lg:mx-auto lg:gap-2 flex justify-center bottom-0 w-full"
      >
        <form-button
          class="bg-green-700 text-white font-bold py-3 lg:py-2 w-full bottom-0 lg:w-48 hover:bg-green-600"
          id="btn-save-form"
          type="submit"
          :label="$t('message.save')"
        ></form-button>
        <form-button
          class="bg-red-700 text-white font-bold py-3 lg:py-2 w-full bottom-0 lg:w-48 hover:bg-red-600"
          id="btn-leave-form"
          type="button"
          @click="displayDialog = true"
          :label="$t('message.goBack')"
        ></form-button>
      </div>
    </form>
    <dialog-vue :display="displayDialog" :message="$t('message.areYouSure')">
      <custom-button
        @click="goBack"
        class="bg-slate-700 text-white font-bold py-3 lg:py-2 w-full bottom-0 lg:w-48"
        id="btn-save-form"
        :label="$t('message.yes')"
      ></custom-button>
      <custom-button
        @click="displayDialog = false"
        class="bg-slate-700 text-white font-bold py-3 lg:py-2 w-full bottom-0 lg:w-48"
        id="btn-leave-form"
        :label="$t('message.no')"
      ></custom-button>
    </dialog-vue>
  </div>
  <date-picker
    v-if="showDatePicker"
    @hide-date-picker="showDatePicker = false"
    @update-date="(value: string) => form.deadline=value"
  ></date-picker>
</template>
