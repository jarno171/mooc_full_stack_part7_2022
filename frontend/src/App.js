import { useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import { connect, useDispatch } from 'react-redux'
import { initializeBlogs, addBlog, setBlogs, addLike } from './reducers/blogReducer'
import { setVisibility } from './reducers/visibilityReducer'
import { setUser } from './reducers/userReducer'
import NavigationBar from './components/NavigationBar'
import AddNewBlog from './components/AddNewBlog'
import BlogList from './components/BlogList'

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

  const loggedUserView = () => {
    return (
      <div>
        <NavigationBar />
        <BlogList />
        <AddNewBlog />
      </div>
    )
  }

  return <div>{props.user === null ? <LoginForm /> : loggedUserView()}</div>
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