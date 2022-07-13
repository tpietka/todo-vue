<template>
  <div class="text-red-500" v-if="displayError">
    {{ messageToDisplay }}
  </div>
</template>
<script setup lang="ts">
import { ErrorObject } from '@vuelidate/core';
import { computed } from 'vue';

const props = defineProps<{
  displayError: boolean;
  errorMessages: ErrorObject[];
}>();

const messageToDisplay = computed((): string => {
  return props.errorMessages[0].$message as string;
});
</script>
