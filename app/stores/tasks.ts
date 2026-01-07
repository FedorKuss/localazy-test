import { defineStore } from 'pinia'

export type TaskStatus = 'todo' | 'in-progress' | 'done'
export type TaskFilter = TaskStatus | 'all'

export type Task = {
  id: string
  title: string
  description?: string
  status: TaskStatus
  createdAt: string
}

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])
  const filter = ref<TaskFilter>('all')

  const filteredTasks = computed(() => {
    if (filter.value === 'all') return tasks.value
    return tasks.value.filter(t => t.status === filter.value)
  })

  async function fetchTasks(nextFilter?: TaskFilter) {
    if (nextFilter) filter.value = nextFilter

    const query = filter.value === 'all' ? {} : { status: filter.value }

    const res = await $fetch<{ tasks: Task[] }>('/api/tasks', { query })

    tasks.value = res.tasks
    return tasks.value
  }

  return {
    tasks,
    filter,
    filteredTasks,
    fetchTasks
  }
})
