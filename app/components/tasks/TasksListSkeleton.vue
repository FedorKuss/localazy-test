<template>
  <div class="space-y-3" aria-busy="true" aria-live="polite">
    <div
      v-for="i in rows"
      :key="i"
      class="animate-pulse rounded-xl bg-white p-4 ring-1 ring-slate-200"
    >
      <div class="h-4 w-1/3 rounded bg-slate-200" />
      <div class="mt-3 h-3 w-2/3 rounded bg-slate-200" />
      <div class="mt-2 h-3 w-1/2 rounded bg-slate-200" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ rows?: number }>(), { rows: 4 });

const rows = computed(() => Math.max(1, props.rows));
</script>
