import { promises as fs } from 'node:fs';
import { join } from 'node:path';

export type TaskStatus = 'todo' | 'in-progress' | 'done';

export type Task = {
  id: number;
  title: string;
  status: TaskStatus;
};

const DATA_DIR = join(process.cwd(), 'server', 'data');
const TASKS_FILE = join(DATA_DIR, 'tasks.json');

const SEED_TASKS: Task[] = [
  { id: 1, title: 'Prepare release', status: 'done' },
  { id: 2, title: 'Fix login bug', status: 'in-progress' },
  { id: 3, title: 'Write API docs', status: 'todo' },
];

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(TASKS_FILE);
  } catch {
    await fs.writeFile(TASKS_FILE, JSON.stringify(SEED_TASKS, null, 2), 'utf8');
  }
}

async function readTasks(): Promise<Task[]> {
  await ensureDataFile();
  const raw = await fs.readFile(TASKS_FILE, 'utf8');
  return JSON.parse(raw) as Task[];
}

async function writeTasks(tasks: Task[]): Promise<void> {
  await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf8');
}

export async function getTasks(): Promise<Task[]> {
  return readTasks();
}

export async function getTaskById(id: number): Promise<Task | undefined> {
  const tasks = await readTasks();
  return tasks.find((t) => t.id === id);
}

export async function updateTask(
  id: number,
  patch: Partial<Pick<Task, 'title' | 'status'>>,
): Promise<Task | undefined> {
  const tasks = await readTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return undefined;

  const updated: Task = { ...tasks[index], ...patch };
  tasks[index] = updated;
  await writeTasks(tasks);
  return updated;
}

export async function createTask(input: {
  title: string;
  status?: TaskStatus;
}): Promise<Task> {
  const tasks = await readTasks();

  const maxId = tasks.reduce((max, t) => Math.max(max, t.id), 0);

  const newTask: Task = {
    id: maxId + 1,
    title: input.title,
    status: input.status ?? 'todo',
  };

  tasks.push(newTask);
  await writeTasks(tasks);

  return newTask;
}
