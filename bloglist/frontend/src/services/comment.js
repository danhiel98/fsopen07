import axios from 'axios'
const blogUrl = '/api/blogs'

const create = async (blogId, content) => {
  const response = await axios.post(`${blogUrl}/${blogId}/comments`, { content })
  return response.data
}

export default {
  create
}