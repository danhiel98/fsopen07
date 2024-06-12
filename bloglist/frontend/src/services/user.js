import axios from 'axios'

const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getById = async id => {
  console.log(`url: ${baseUrl}/${id}`)
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default {
  getAll,
  getById
}