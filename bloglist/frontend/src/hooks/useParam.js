import { useMatch } from 'react-router-dom'

/**
 * Finds a specific element in an array of data based on a route parameter specified in path.
*/

const useParam = (data, path) => {
  const findById = (id) => data.find(d => d.id === id)

  const match = useMatch(path)
  const dataFound = match
    ? findById(match.params.id)
    : null

  return dataFound
}

export { useParam }