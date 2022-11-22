import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import store from '../store'
import { addLike, removeBlog } from '../reducers/blogReducer'

const handleAddLike = async (blog, setLikes) => {
  const updatedBlog = {
    ...blog,
    likes: blog.likes + 1,
  }

  await blogService.update(updatedBlog)

  setLikes(blog.likes + 1)

  store.dispatch(addLike(updatedBlog.id))
}

const handleDeleteBlog = async (blog) => {
  if (window.confirm(`Remove ${blog.title}?`)) {
    await blogService.remove(blog)

    store.dispatch(removeBlog(blog.id))
  }
}

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <>
      <div className="blog" style={blogStyle}>
        <div>
          <p>{blog.title}</p>
          <button style={hideWhenVisible} onClick={toggleVisibility}>
            view
          </button>
          <button style={showWhenVisible} onClick={toggleVisibility}>
            close
          </button>
        </div>

        <div style={showWhenVisible}>
          <p>{blog.url}</p>
          <p>
            likes {likes}{' '}
            <button id="like-button" onClick={() => handleAddLike(blog, setLikes)}>
              like
            </button>
          </p>
          <p>{blog.author}</p>
          <button
            id="delete-button"
            style={showWhenVisible}
            onClick={() => handleDeleteBlog(blog)}
          >
            delete
          </button>
        </div>
      </div>
    </>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

// set display name
Blog.displayName = 'Blog'

export default Blog
