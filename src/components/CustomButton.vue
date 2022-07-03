<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps<{
  routeName?: string;
  label: string;
  classes?: string;
  id?: string;
}>();

const navigate = () => {
  if (props.routeName) {
    router.push({ name: props.routeName });
  }
};
</script>
<template>
  <button :class="classes" :id="id" @click="navigate">
    {{ label }}
  </button>
</template>
