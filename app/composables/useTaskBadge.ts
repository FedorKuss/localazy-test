import type { TaskStatus } from '~/stores/tasks'

export function useTaskBadge() {
  function badgeClasses(s: TaskStatus) {
    switch (s) {
      case 'todo':
        return 'bg-slate-100 text-slate-700 ring-slate-200'
      case 'in-progress':
        return 'bg-amber-50 text-amber-800 ring-amber-200'
      case 'done':
        return 'bg-emerald-50 text-emerald-800 ring-emerald-200'
    }
  }

  return { badgeClasses }
}
