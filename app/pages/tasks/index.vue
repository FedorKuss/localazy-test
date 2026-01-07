<script setup lang="ts">
import type { TaskFilter } from "~/stores/tasks";

const { selected } = useTaskStatusQuery();

// Dataset used for rendering the filtered task list
const { tasks, pending, error, refresh } = useTasksFetch(selected);

// Dataset used only for computing status counts (always "all")
const allFilter = ref<TaskFilter>("all");
const {
  tasks: allTasks,
  pending: pendingAll,
  error: errorAll,
  refresh: refreshAll,
} = useTasksFetch(allFilter);

// Status filter options with counts derived from all tasks
const { statuses } = useTaskFilterOptions(allTasks);

// Refresh both list data and counts
function refreshBoth() {
  refresh();
  refreshAll();
}
</script>

<template>
  <TasksPageLayout>
    <TasksHeader
      :refresh-disabled="pending || pendingAll"
      @refresh="refreshBoth"
    />

    <TasksToolbar>
      <TasksCreateForm @created="refreshBoth" />
      <TasksStatusFilter v-model="selected" :statuses="statuses" />
    </TasksToolbar>

    <TasksContent>
      <TasksErrorState v-if="error || errorAll" />

      <TasksListSkeleton v-else-if="pending" :rows="4" />

      <TasksList v-else :tasks="tasks">
        <template #empty>
          <TasksEmptyState />
        </template>
      </TasksList>
    </TasksContent>
  </TasksPageLayout>
</template>
