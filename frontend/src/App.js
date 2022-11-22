import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { connect, useDispatch } from 'react-redux'
import { initializeBlogs, addBlog, setBlogs } from './reducers/blogReducer'
import { setVisibility } from './reducers/visibilityReducer'
import { setUser } from './reducers/userReducer'

const App = ({ setUser, ...props }) => {

  const dispatch = useDispatch()
  const blogRef = useRef()

  const blogs = props.blogs

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [setUser])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleAddLike = async () => {
    const updatedBlog = {
      ...blogRef.current.blog,
      likes: blogRef.current.likes + 1,
    }

    await blogService.update(updatedBlog)

    const findBlog = blogs.find((blog) => blog.id === updatedBlog.id)
    findBlog.likes += 1

    blogRef.current.setLikes(blogRef.current.likes + 1)
  }

  const handleDeleteBlog = async () => {
    if (window.confirm(`Remove ${blogRef.current.blog.title}?`)) {
      await blogService.remove(blogRef.current.blog)

      props.setBlogs(blogs.filter((blog) => blog.id !== blogRef.current.blog.id))
    }
  }

  const blogList = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>
          {props.user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>

        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleAddLike={handleAddLike}
            handleDeleteBlog={handleDeleteBlog}
            ref={blogRef}
          />
        ))}
      </div>
    )
  }

  const addNewBlog = () => {
    const hideWhenVisible = { display: props.visibility ? 'none' : '' }
    const showWhenVisible = { display: props.visibility ? '' : 'none' }

    return (
      <div>
        <Notification message={props.notification} />

        <div style={hideWhenVisible}>
          <button onClick={() => props.setVisibility(true)}>
            add a new blog
          </button>
        </div>

        <div style={showWhenVisible}>
          <BlogForm />
        </div>
      </div>
    )
  }

  const loginForm = () => {
    return (
      <LoginForm />
    )
  }

  const loggedUserView = () => {
    return (
      <div>
        {blogList()}
        {addNewBlog()}
      </div>
    )
  }

  return <div>{props.user === null ? loginForm() : loggedUserView()}</div>
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
  addBlog,
  setVisibility,
  setUser,
  setBlogs,
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp