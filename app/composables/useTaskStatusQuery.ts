import type { TaskFilter } from '~/stores/tasks'

const ALLOWED: TaskFilter[] = ['all', 'todo', 'in-progress', 'done']

function normalize(value: unknown): TaskFilter {
  if (typeof value !== 'string') return 'all'
  return (ALLOWED as string[]).includes(value) ? (value as TaskFilter) : 'all'
}

export function useTaskStatusQuery() {
  const route = useRoute()
  const router = useRouter()

  const selected = ref<TaskFilter>(normalize(route.query.status))

  // 1) selected -> query
  watch(
    selected,
    async (next) => {
      const nextQuery = {
        ...route.query,
        status: next === 'all' ? undefined : next
      }

      await router.replace({ query: nextQuery })
    },
    { flush: 'post' }
  )

  // 2) Sync route query -> selected (handles back/forward navigation and manual URL changes)
  watch(
    () => route.query.status,
    (status) => {
      const normalized = normalize(status)
      if (normalized !== selected.value) selected.value = normalized
    }
  )

  return {
    selected,
    allowed: ALLOWED
  }
}
