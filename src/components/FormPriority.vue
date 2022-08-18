<script setup lang="ts">
defineProps<{ priority: number }>();
</script>

<template>
  <span
    @click="$emit('update:modelValue', n)"
    v-for="n in 5"
    :class="[
      n <= priority ? 'text-red-500' : 'text-slate-300',
      'material-icons lg-36 cursor-pointer not-selectable',
    ]"
  >
    local_fire_department
  </span>
</template>
