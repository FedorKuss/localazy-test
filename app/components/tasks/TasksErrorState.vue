<template>
  <div
    class="rounded-xl bg-red-50 p-4 text-sm text-red-800 ring-1 ring-red-200"
  >
    {{ message }}
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    message?: string;
  }>(),
  {
    message: "Failed to load tasks.",
  }
);
</script>
