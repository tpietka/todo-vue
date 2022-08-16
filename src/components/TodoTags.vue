<script setup lang="ts">
defineProps<{
  tags: string[];
}>();
</script>

<template>
  <div v-if="tags.length > 0" class="flex py-2 gap-1">
    <span
      class="px-2 py-0.2 text-[10px] border-2 rounded-xl border-slate-800 dark:border-slate-100"
      v-for="tag in tags"
      :key="tag"
    >
      {{ tag }}
    </span>
  </div>
</template>
