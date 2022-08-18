<script setup lang="ts">
const props = defineProps<{
  tags: string[];
}>();

const updateTags = (index: number) => {
  props.tags.splice(index, 1);
  return props.tags;
};
</script>

<template>
  <div v-if="tags.length > 0" class="flex mt-4 gap-2">
    <div
      class="p-2 flex items-center gap-2 border-2 rounded-xl border-slate-800 dark:border-slate-100"
      v-for="(tag, index) in tags"
      :key="index"
    >
      {{ tag }}
      <span
        class="material-icons not-selectable cursor-pointer"
        @click="$emit('update:modelValue', updateTags(index))"
        >cancel</span
      >
    </div>
  </div>
</template>
