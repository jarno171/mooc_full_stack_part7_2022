import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const getComments = async (blogId) => {
  const request = axios.get(`${baseUrl}/${blogId}/comments`)
  return request.then((response) => response.data)
}

const addComment = async (blogId, comment) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, {comment: comment})
  return response.data
}

const remove = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response
}

export default {
  getAll,
  create,
  setToken,
  update,
  remove,
  getComments,
  addComment
}
