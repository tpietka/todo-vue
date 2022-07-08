<script setup lang="ts">
import { computed } from 'vue';
import {
  getCurrentDate,
  formatDateToYYYYMMDD,
  formatDateToDDMMYYYY,
} from '../helpers/date';
const props = defineProps<{
  done: boolean;
  date: string;
}>();

const isDeadlineToday = computed(() => {
  return getCurrentDate() >= formatDateToYYYYMMDD(props.date);
});
</script>
<template>
  <span
    :class="[
      isDeadlineToday && !done ? 'text-red-500' : 'dark:text-slate-100 text-slate-800',
      'flex text-xs items-center gap-1 date-container mt-2',
    ]"
  >
    <span class="date"> {{ formatDateToDDMMYYYY(date) }}</span>
    <span class="material-icons lg-14"> {{ done ? 'task_alt' : 'schedule' }} </span>
  </span>
</template>
