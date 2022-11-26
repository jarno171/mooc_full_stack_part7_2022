import { useState } from 'react'
import { setVisibility } from '../reducers/visibilityReducer'
import { createBlog } from '../reducers/blogReducer'
import { connect, } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { Form, Button, } from 'react-bootstrap'

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
    <Form onSubmit={addBlog}>
      <Form.Group>
        <Form.Label>title:</Form.Label>
        <Form.Control
          type="text"
          id="title"
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
          name="title"
        />

        <Form.Label>author:</Form.Label>
        <Form.Control
          type="text"
          id="author"
          value={newAuthor}
          onChange={(event) => setNewAuthor(event.target.value)}
          name="author"
        />

        <Form.Label>url:</Form.Label>
        <Form.Control
          type="text"
          id="url"
          value={newUrl}
          onChange={(event) => setNewUrl(event.target.value)}
          name="url"
        />

        <Button type="submit" id="add-button">
          add
        </Button>
        <Button type="reset" id="cancel-button" onClick={cancelAdd}>
          cancel
        </Button>
      </Form.Group>
    </Form>
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