import { readBody, createError } from 'h3';
import { createTask, TaskStatus } from '../../utils/tasks-store';

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    title?: string;
    status?: TaskStatus;
  }>(event);

  const title = typeof body.title === 'string' ? body.title.trim() : '';

  if (!title) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Title is required',
    });
  }

  const status: TaskStatus =
    body.status && ['todo', 'in-progress', 'done'].includes(body.status)
      ? body.status
      : 'todo';

  const created = await createTask({ title, status });

  await wait(500); // UX parity s PUT

  return created;
});
