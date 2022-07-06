<script setup lang="ts">
defineProps({
  label: String,
});
</script>

<template>
  <div class="text-sm">{{ label }}</div>
</template>
