<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import { Task, Todo } from '../models/todo';
import { useTodos } from '../stores/todos';
import { useVuelidate } from '@vuelidate/core';
import InputLabel from '../components/InputLabel.vue';
import DatePicker from '../components/DatePicker.vue';
import ValidationErrorMessage from '../components/ValidationErrorMessage.vue';
import { useValidations } from '../composables/validations';
import FormButton from '../components/FormButton.vue';
import CustomButton from '../components/CustomButton.vue';
import DialogVue from '../components/Dialog.vue';
import FormTasks from '../components/FormTasks.vue';
import FormTags from '../components/FormTags.vue';
import FormInput from '../components/FormInput.vue';
import FormPriority from '../components/FormPriority.vue';

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

const { submitForm, getTodo } = useTodos();
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

const submit = async (e: Event) => {
  e.preventDefault();
  await submitForm(v.value, form.value);
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
    <form @submit="submit" @keydown.enter="$event.preventDefault()">
      <div class="w-full lg:px-0 px-8 pb-8 lg:w-96 lg:mx-auto">
        <input-label :label="$t('message.title')"></input-label>
        <form-input v-model="form.title"></form-input>
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
          <form-input
            v-model="task"
            @keyup.enter="addTask"
            @change="addTask"
          ></form-input>
          <span
            class="material-icons cursor-pointer absolute not-selectable dark:text-[#141921] mr-2 right-0"
            >add</span
          >
        </span>
        <form-tasks :tasks="form.tasks"></form-tasks>
      </div>
      <div class="w-full lg:px-0 px-8 pb-8 lg:w-96 lg:mx-auto">
        <input-label :label="$t('message.tags')"></input-label>
        <form-input
          v-model="tag"
          @keyup.enter="addTag"
          @keyup.space="addTag"
          @change="addTag"
        ></form-input>
        <form-tags :tags="form.tags" v-model="form.tags"></form-tags>
      </div>
      <div class="w-full lg:px-0 px-8 pb-8 lg:w-96 lg:mx-auto">
        <input-label :label="$t('message.deadline')"></input-label>
        <span class="relative flex items-center">
          <form-input v-model="form.deadline" placeholder="YYYY-MM-DD"></form-input>
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
        <form-priority v-model="form.priority" :priority="form.priority"></form-priority>
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
        @click="$router.back()"
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
