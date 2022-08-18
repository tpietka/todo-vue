<script setup lang="ts">
defineProps<{
  label: string;
  type: 'submit' | 'reset' | 'button';
  id?: string;
}>();
</script>

<template>
  <button :type="type" :id="id">
    {{ label }}
  </button>
</template>
