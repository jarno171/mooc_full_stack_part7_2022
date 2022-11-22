import { useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { connect, useDispatch } from 'react-redux'
import { initializeBlogs, addBlog, setBlogs, addLike } from './reducers/blogReducer'
import { setVisibility } from './reducers/visibilityReducer'
import { setUser } from './reducers/userReducer'

const App = ({ setUser, ...props }) => {

  const dispatch = useDispatch()

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
  addLike,
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp