// middleware/task-id.ts
export default defineNuxtRouteMiddleware((to) => {
  const id = to.params.id

  // Nuxt môže dať param ako string alebo string[]
  const raw = Array.isArray(id) ? id[0] : id

  // Ak je id prázdne alebo nie je string, je to invalid
  if (typeof raw !== 'string' || raw.length === 0) {
    return navigateTo('/404', { replace: true })
  }

  // Ak tvoje task IDs sú číselné (najčastejšie), validuj digits-only:
  // uprav regex, ak máš UUID alebo iný formát
  const isValid = /^\d+$/.test(raw)

  if (!isValid) {
    return navigateTo('/404', { replace: true })
  }
})
