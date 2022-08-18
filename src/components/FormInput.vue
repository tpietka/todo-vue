<script setup lang="ts">
defineProps<{
  modelValue: string;
  placeholder?: string;
}>();
</script>
<template>
  <input
    class="w-full px-4 bg-slate-300 text-slate-800 h-10"
    type="text"
    :placeholder="placeholder"
    v-model="modelValue"
    @change="$emit('update:modelValue', modelValue)"
    @keyup.enter="$emit('update:modelValue', modelValue)"
    @keyup.space="$emit('update:modelValue', modelValue)"
  />
</template>
