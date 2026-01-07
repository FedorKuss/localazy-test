import type { Task, TaskFilter } from '~/stores/tasks'

export function useTaskFilterOptions(tasks: Ref<Task[]>) {
  const statuses = computed<Array<{ label: string; value: TaskFilter; count: number }>>(() => {
    const all = tasks.value.length

    const todo = tasks.value.filter(t => t.status === 'todo').length
    const inProgress = tasks.value.filter(t => t.status === 'in-progress').length
    const done = tasks.value.filter(t => t.status === 'done').length

    return [
      { label: 'All', value: 'all', count: all },
      { label: 'Todo', value: 'todo', count: todo },
      { label: 'In progress', value: 'in-progress', count: inProgress },
      { label: 'Done', value: 'done', count: done }
    ]
  })

  return { statuses }
}
