# Tasks Dashboard Assignment

We are Localazy, and we're looking for developers who enjoy building clean,
well-structured applications and can work independently.

If you'd like to join our team, this assignment will help us understand how you think,
how you approach problems, and how you write code.

Below is a quick intro to our stack, followed by the task itself.

The frontend part is a `pnpm` monorepo managed with `Turborepo`. Inside the monorepo we
have two main applications and several shared packages. The Product SPA runs on `Vue 3`
with `Vite`, uses `Pinia` for state management, `Tailwind 3` for styling,
and `Vitest` + `Cypress` for testing. The Product Web application is built on `Nuxt 4`
and fetches its content from `Directus CMS`. The entire codebase is written in `TypeScript 5`,
formatted with `Prettier`, linted with `ESLint`, and runs on `Node 22`. Shared packages provide
common UI, utilities, and types across both applications.

---

## Assignment

### Project Preparation

Install dependencies a fresh `Nuxt` application using:

```shell
pnpm i
```

and then run
```shell
pnpm run dev
```

### Project Overview
The project dependencies and Nuxt configuration already include `Pinia` and `Tailwind`.

You may structure the project however you prefer, but keep the code clean and readable.
Please use `Tailwind` for styling, and design the entire UI according to your best judgement.
You don't need to match any specific design; a simple, clean UI is perfectly fine.


### Feature A: Fetch + Filter + Loading State
To simulate communication with backend, use a server route in `server/api/tasks.get.ts` that retrieves the list of tasks from a JSON-backed mock datastore defined in `server/utils/tasks-store.ts`. 

Your goal is to implement the `/tasks` page that displays the list of tasks.

Requirements:
- Fetch data using `useAsyncData`
- Allow filtering tasks by status
- Display a loading state while data is being fetched
- Display an empty state if no tasks match the filter
- Implement task-related logic in a way that can be reused elsewhere

### Feature B: Detail Page + Route Param Validation
Implement the `/tasks/[id]` page that displays a single task. Use the server route in `server/api/tasks/[id].get.ts` to retrieve the given task by id.

Requirements:
- Load the task by ID
- If the task does not exist → redirect to `/404`
- Use Nuxt middleware to validate the ID or handle invalid/not-found states

### Feature C: Simple Form + Error Handling
To continue the existing task detail page, add the functionality to update an existing task. Use the server route in `server/api/tasks/[id].put.ts` to update it.

On the task detail page, extend the UI:

- Add an input for editing the task title
- Add a Save button
- Call PUT `/api/tasks/[id]` when saving
- Show a loading indicator during save
- Show an error state if the update fails

## Submission

Please submit your solution as a public GitHub repository.

Once your repository is ready, send us the GitHub link so we can review your work.

## Additional notes / expectations

You are free to add small improvements or refinements if you believe they make the project
better. We place a strong emphasis on code quality, clarity, maintainability, and independent
decision-making.

We want to see not only that you can complete the assignment, but also how you think about
the problem, structure your code, and make technical decisions without being explicitly
instructed at every step.

This means we value:
- **Clean, readable code** that another developer could immediately follow
- **Consistent structure and naming**, even in a small demo project
- **Separation of concerns** - UI, data fetching, and business logic should not be mixed unnecessarily
- **Predictable UX**: handling loading, error, and empty states thoughtfully
- **Independent architectural choices** - deciding when logic belongs in a store, composable, or component, and being able to justify that decision
- **Attention to detail** - small touches that improve DX or UX are appreciated
- **Self-sufficiency** - the ability to resolve ambiguity, make assumptions, and complete the task without needing step-by-step guidance
- **AI usage** - you are welcome and even encouraged to use AI to help you fulfill the task. However, don't submit fully AI generated code that you barely review or improve.
