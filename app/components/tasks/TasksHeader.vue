<template>
  <div class="flex items-start justify-between gap-4">
    <div>
      <h1 class="text-2xl font-semibold text-slate-900">
        {{ title }}
      </h1>

      <p v-if="subtitle" class="mt-1 text-sm text-slate-600">
        {{ subtitle }}
      </p>
    </div>

    <div class="flex gap-2">
      <slot name="actions">
        <button
          type="button"
          class="rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
          :disabled="refreshDisabled"
          @click="emit('refresh')"
        >
          {{ refreshLabel }}
        </button>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
    refreshLabel?: string;
    refreshDisabled?: boolean;
  }>(),
  {
    title: "Tasks",
    subtitle: "Filterable tasks list.",
    refreshLabel: "Refresh",
    refreshDisabled: false,
  }
);

const emit = defineEmits<{
  (e: "refresh"): void;
}>();
</script>
