import { useState } from 'react'
import { setVisibility } from '../reducers/visibilityReducer'
import { createBlog } from '../reducers/blogReducer'
import { connect, } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'

const BlogForm = (props) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()

    props.createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      user: props.user,
    })

    props.createNotification('added new blog')
    props.setVisibility(false)

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  const cancelAdd = () => {
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')

    props.setVisibility(false)
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type="text"
          id="title"
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
          name="title"
        />
      </div>
      <div>
        author:
        <input
          type="text"
          id="author"
          value={newAuthor}
          onChange={(event) => setNewAuthor(event.target.value)}
          name="author"
        />
      </div>
      <div>
        url:
        <input
          type="text"
          id="url"
          value={newUrl}
          onChange={(event) => setNewUrl(event.target.value)}
          name="url"
        />
      </div>
      <button type="submit" id="add-button">
        add
      </button>
      <button type="reset" id="cancel-button" onClick={cancelAdd}>
        cancel
      </button>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
    visibility: state.visibility,
    notification: state.notification,
    error: state.error,
  }
}

const mapDispatchToProps = {
  createBlog,
  setVisibility,
  createNotification,
}


const ConnectedBlogForm = connect(mapStateToProps, mapDispatchToProps)(BlogForm)
export default ConnectedBlogForm