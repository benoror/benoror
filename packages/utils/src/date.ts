export function sinceToYears(since?: number) {
  const sinceYear = since ?? 0;
  if (sinceYear === 0) return 0;

  const currentYear = new Date().getFullYear();
  // Add 1 to include the current year if not completed, e.g., 2022–2024 = 3 years (2022, 2023, 2024)
  return Math.max(0, Math.ceil(currentYear - sinceYear + 1 - (new Date().getMonth() === 0 ? 0 : 0)));
}

export function sinceToString(since?: number, short: boolean = true) {
  const experience = sinceToYears(since);
  const years = experience === 1 ? (short ? 'y' : 'year of experience') : (short ? 'y' : 'years of experience');
  return experience > 0 ? `${experience}${years}` : '';
}
