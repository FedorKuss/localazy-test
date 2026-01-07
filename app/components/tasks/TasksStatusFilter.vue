<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="s in statuses"
      :key="s.value"
      type="button"
      class="rounded-full px-3 py-1.5 text-sm ring-1 transition"
      :class="
        modelValue === s.value
          ? 'bg-slate-900 text-white ring-slate-900'
          : 'bg-white text-slate-700 ring-slate-200 hover:bg-slate-100'
      "
      @click="emit('update:modelValue', s.value)"
    >
      {{ s.label }}
      <span class="ml-1 opacity-70">({{ s.count }})</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { TaskFilter } from "~/stores/tasks";

defineProps<{
  modelValue: TaskFilter;
  statuses: Array<{
    label: string;
    value: TaskFilter;
    count: number;
  }>;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: TaskFilter): void;
}>();
</script>
