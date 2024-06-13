const commentsRouter = require('express').Router({ mergeParams: true })
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    .populate('comments')

  if (blog) {
    response.json(blog.comments)
  } else {
    response.status(404).end()
  }
})

commentsRouter.post('/', async (request, response) => {
  const { content } = request.body

  const blog = await Blog.findById(request.params.id)


  if (!blog) {
    return response.status(404).end()
  }

  const comment = new Comment({
    content,
    blog: blog.id
  })

  const createdComment = await comment.save()


  blog.comments = blog.comments.concat(createdComment._id)
  await blog.save()

  response.status(201).json(createdComment)
})

module.exports = commentsRouter