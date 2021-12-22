export const capitalize = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str[0].toUpperCase() + str.substring(1)
}

export const trunctcate = (str, limit) => {
  return str.slice(0, limit) + "..."
}