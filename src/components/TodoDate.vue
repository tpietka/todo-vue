<script setup lang="ts">
import { formatDateToDDMMYYYY } from '../helpers/date';
defineProps<{
  iconName: string;
  date: string;
}>();
</script>
<template>
  {{ formatDateToDDMMYYYY(date) }}
  <span class="material-icons md-18"> {{ iconName }} </span>
</template>
