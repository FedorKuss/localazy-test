<script setup lang="ts">
import type { Task, TaskStatus } from "~/types/task";

definePageMeta({
  middleware: ["task-id"],
});

const route = useRoute();

const id = computed(() =>
  Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
);

const {
  data: task,
  pending,
  error,
} = await useAsyncData<Task>(
  () => `task:${id.value}`,
  async () => {
    return await $fetch<Task>(`/api/tasks/${id.value}`);
  }
);

watchEffect(() => {
  if (error.value) {
    navigateTo("/404", { replace: true });
  }
});

const { formatDate } = useDateFormat();
const { badgeClasses } = useTaskBadge();

const titleDraft = ref("");
const statusDraft = ref<TaskStatus>("todo");

const savePending = ref(false);
const saveError = ref<string | null>(null);
const saveSuccess = ref(false);

watch(
  task,
  (t) => {
    if (!t) return;
    titleDraft.value = t.title ?? "";
    statusDraft.value = t.status;
  },
  { immediate: true }
);

const canSave = computed(() => {
  if (!task.value) return false;
  if (savePending.value) return false;

  const nextTitle = titleDraft.value.trim();
  if (!nextTitle) return false;

  const changedTitle = nextTitle !== (task.value.title ?? "");
  const changedStatus = statusDraft.value !== task.value.status;

  return changedTitle || changedStatus;
});

async function saveTask() {
  if (!task.value || !canSave.value) return;

  savePending.value = true;
  saveError.value = null;
  saveSuccess.value = false;

  try {
    const body: { title?: string; status?: TaskStatus } = {
      title: titleDraft.value.trim(),
      status: statusDraft.value,
    };

    const updated = await $fetch<Task>(`/api/tasks/${id.value}`, {
      method: "PUT",
      body,
    });

    task.value = updated;
    saveSuccess.value = true;

    setTimeout(() => {
      saveSuccess.value = false;
    }, 1500);
  } catch (e: any) {
    const statusCode = e?.statusCode ?? e?.response?.status ?? e?.status;
    const message =
      e?.data?.statusMessage ||
      e?.statusMessage ||
      e?.message ||
      "Update failed.";

    // If the task was deleted between load and save, redirect to 404.
    if (statusCode === 404) {
      navigateTo("/404", { replace: true });
      return;
    }

    saveError.value = message;
  } finally {
    savePending.value = false;
  }
}

const statusOptions: Array<{ label: string; value: TaskStatus }> = [
  { label: "Todo", value: "todo" },
  { label: "In progress", value: "in-progress" },
  { label: "Done", value: "done" },
];
</script>

<template>
  <TasksPageLayout>
    <TasksHeader
      :title="task?.title ?? 'Task detail'"
      subtitle="Edit and update an existing task."
    >
      <template #actions>
        <NuxtLink
          to="/tasks"
          class="rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
        >
          Back
        </NuxtLink>
      </template>
    </TasksHeader>

    <TasksContent>
      <TasksListSkeleton v-if="pending" :rows="2" />

      <div v-else-if="task" class="space-y-4">
        <TasksErrorState v-if="saveError" :message="saveError" />

        <div class="rounded-xl bg-white p-5 ring-1 ring-slate-200">
          <div class="space-y-4">
            <div class="flex items-center justify-between gap-4">
              <label class="block text-sm font-medium text-slate-700">
                Title
              </label>

              <span
                class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1"
                :class="badgeClasses(task.status)"
              >
                {{ task.status }}
              </span>
            </div>

            <input
              v-model="titleDraft"
              type="text"
              class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-300 disabled:opacity-60"
              :disabled="savePending"
              autocomplete="off"
            />

            <div>
              <label class="block text-sm font-medium text-slate-700">
                Status
              </label>

              <select
                v-model="statusDraft"
                class="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-300 disabled:opacity-60"
                :disabled="savePending"
              >
                <option
                  v-for="o in statusOptions"
                  :key="o.value"
                  :value="o.value"
                >
                  {{ o.label }}
                </option>
              </select>
            </div>

            <p v-if="task.description" class="text-sm text-slate-600">
              {{ task.description }}
            </p>

            <p v-if="task.createdAt" class="text-xs text-slate-500">
              Created: {{ formatDate(task.createdAt) }}
            </p>

            <div class="flex items-center gap-3 pt-2">
              <button
                type="button"
                class="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                :disabled="!canSave"
                @click="saveTask"
              >
                <span v-if="savePending">Saving…</span>
                <span v-else>Save</span>
              </button>

              <p v-if="saveSuccess" class="text-xs text-emerald-700">Saved</p>
            </div>
          </div>
        </div>
      </div>
    </TasksContent>
  </TasksPageLayout>
</template>
