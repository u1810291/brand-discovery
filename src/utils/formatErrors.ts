export function formattedMessage(str) {
  console.error(str?.split('/')[1].slice(0, -2))
  return str?.split('/')[1].slice(0, -2)
}
