export function sinceToYears(since?: number) {
  const sinceYear = (since ?? 0)
  if (sinceYear === 0) return 0
  
  return 2024 - (since ?? 0)
}

export function sinceToString(since?: number) {
  const experience = sinceToYears(since)
  const years = experience === 1 ? 'year' : 'years'
  return experience > 0 ? `${experience} ${years} of experience` : ''
}
