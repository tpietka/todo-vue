<script setup lang="ts">
import { computed } from 'vue';
import {
  getCurrentDate,
  formatDateToYYYYMMDD,
  formatDateToDDMMYYYY,
  isDeadlineTodayOrPastDeadline,
} from '../helpers/date';
const props = defineProps<{
  done: boolean;
  date: string;
}>();
</script>
<template>
  <span
    :class="[
      isDeadlineTodayOrPastDeadline(date) && !done
        ? 'text-red-500'
        : 'dark:text-slate-100 text-slate-800',
      'flex text-xs items-center gap-1 date-container',
    ]"
  >
    <span class="material-icons lg-14"> {{ done ? 'task_alt' : 'schedule' }} </span>
    <span class="date"> {{ formatDateToDDMMYYYY(date) }}</span>
  </span>
</template>
