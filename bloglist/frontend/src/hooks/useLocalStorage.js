/**
 * Fetches and parses data stored in the browser's localStorage based on a key provided as an argument.
*/

const useLocalStorage = target => {
  const item = window.localStorage.getItem(target)

  return item
    ? JSON.parse(item)
    : null
}

export { useLocalStorage }