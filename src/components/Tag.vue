<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { useTodos } from '../stores/todos';

const { selectedTags } = toRefs(useTodos());

const props = defineProps<{
  tag: string;
}>();

const isTagSelected = computed(() => selectedTags.value.includes(props.tag));
</script>

<template>
  <div
    class="cursor-pointer p-1.5 text-sm border-2 rounded-xl border-slate-800 dark:border-slate-100"
    :class="isTagSelected ? 'bg-slate-500' : 'bg-inherit'"
  >
    {{ tag }}
  </div>
</template>
