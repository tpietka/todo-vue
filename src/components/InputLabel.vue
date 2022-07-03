<script setup lang="ts">
defineProps({
  label: String,
});
</script>

<template>
  <div class="text-black text-sm text-left">{{ label }}</div>
</template>
