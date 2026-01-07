<template>
  <div class="rounded-xl bg-white p-8 text-center ring-1 ring-slate-200">
    <h2 class="text-base font-semibold text-slate-900">
      {{ title }}
    </h2>
    <p class="mt-1 text-sm text-slate-600">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    description?: string;
  }>(),
  {
    title: "No tasks found",
    description: "No tasks match the selected filter.",
  }
);
</script>
