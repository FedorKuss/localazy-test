<template>
  <div class="space-y-3">
    <template v-if="tasks.length > 0">
      <NuxtLink
        v-for="task in tasks"
        :key="task.id"
        :to="`/tasks/${task.id}`"
        class="block rounded-xl bg-white p-4 ring-1 ring-slate-200 hover:bg-slate-50"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <h3 class="text-base font-semibold text-slate-900">
              {{ task.title }}
            </h3>

            <p v-if="task.description" class="mt-1 text-sm text-slate-600">
              {{ task.description }}
            </p>

            <p class="mt-2 text-xs text-slate-500">
              {{ formatDate(task.createdAt) }}
            </p>
          </div>

          <span
            class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1"
            :class="badgeClasses(task.status)"
          >
            {{ task.status }}
          </span>
        </div>
      </NuxtLink>
    </template>

    <slot v-else name="empty">
      <div class="rounded-xl bg-white p-8 text-center ring-1 ring-slate-200">
        <h2 class="text-base font-semibold text-slate-900">No tasks found</h2>
        <p class="mt-1 text-sm text-slate-600">
          No tasks match the selected filter.
        </p>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import type { Task } from "~/stores/tasks";

defineProps<{
  tasks: Task[];
}>();

const { badgeClasses } = useTaskBadge();
const { formatDate } = useDateFormat();
</script>
