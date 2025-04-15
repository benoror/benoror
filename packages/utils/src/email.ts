export const gmailAlias = (email: string, alias: string) => {
  const parts = email.split('@')

  return [parts.slice(0, 1), `+${alias}@`, parts.slice(1)].join('');
}
