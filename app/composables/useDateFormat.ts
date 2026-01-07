export function useDateFormat() {
  function formatDate(value?: string | Date | null) {
    if (!value) return ''

    const date = typeof value === 'string' ? new Date(value) : value

    if (Number.isNaN(date.getTime())) {
      return ''
    }

    return date.toLocaleString()
  }

  return {
    formatDate
  }
}
