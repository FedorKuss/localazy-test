import type { Task, TaskFilter } from '~/stores/tasks'
import { useTasksStore } from '~/stores/tasks'

export function useTasksFetch(selected: Ref<TaskFilter>) {
  const store = useTasksStore()

  const { data, pending, error, refresh } = useAsyncData<Task[]>(
    () => `tasks:${selected.value}`,
    async () => {
      const result = await store.fetchTasks(selected.value)

      // If fetchTasks returns Task[] directly (ideal case)
      if (Array.isArray(result)) return result

      // Fallback: if the store keeps the list in its internal state
      const anyStore = store as any
      if (Array.isArray(anyStore.tasks)) return anyStore.tasks

      // Last-resort fallback
      if (Array.isArray(anyStore.filteredTasks)) return anyStore.filteredTasks

      return []
    },
    { watch: [selected] }
  )

  const tasks = computed(() => data.value ?? [])

  return { store, tasks, pending, error, refresh }
}
