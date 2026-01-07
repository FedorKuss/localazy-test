<template>
  <div class="rounded-xl bg-white p-4 ring-1 ring-slate-200">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div class="flex-1">
        <label class="block text-sm font-medium text-slate-700">
          New task title
        </label>

        <input
          v-model="title"
          type="text"
          class="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-300 disabled:opacity-60"
          :disabled="pending"
          placeholder="e.g. Add unit tests"
          autocomplete="off"
          @keydown.enter.prevent="create"
        />
      </div>

      <button
        type="button"
        class="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="pending || !title.trim()"
        @click="create"
      >
        <span v-if="pending">Creating…</span>
        <span v-else>Add</span>
      </button>
    </div>

    <TasksErrorState v-if="errorMessage" class="mt-3" :message="errorMessage" />
  </div>
</template>

<script setup lang="ts">
import type { TaskStatus } from "~/types/task";

const emit = defineEmits<{
  (e: "created"): void;
}>();

const title = ref("");
const status = ref<TaskStatus>("todo");

const pending = ref(false);
const errorMessage = ref<string | null>(null);

async function create() {
  const trimmed = title.value.trim();
  if (!trimmed) return;

  pending.value = true;
  errorMessage.value = null;

  try {
    await $fetch("/api/tasks", {
      method: "POST",
      body: {
        title: trimmed,
        status: status.value,
      },
    });

    title.value = "";
    emit("created");
  } catch (e: any) {
    errorMessage.value =
      e?.data?.statusMessage ||
      e?.statusMessage ||
      e?.message ||
      "Create failed.";
  } finally {
    pending.value = false;
  }
}
</script>
