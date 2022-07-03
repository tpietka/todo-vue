<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

defineProps<{
  routeName: string;
  label: string;
  classes?: string;
  id?: string;
}>();
</script>
<template>
  <div>
    <button :class="classes" :id="id" @click="router.push({ name: routeName })">
      {{ label }}
    </button>
  </div>
</template>
