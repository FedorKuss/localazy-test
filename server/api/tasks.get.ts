import { getTasks } from '../utils/tasks-store'
import type { TaskStatus } from '../utils/tasks-store'

export default defineEventHandler(async (event) => {
  const { status } = getQuery(event) as { status?: TaskStatus }

  const tasks = await getTasks()

  const filtered =
    status ? tasks.filter((task) => task.status === status) : tasks

  return {
    tasks: filtered
  }
})
