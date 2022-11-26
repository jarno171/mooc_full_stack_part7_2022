import { useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import { connect, useDispatch } from 'react-redux'
import { initializeBlogs, addBlog, setBlogs, addLike } from './reducers/blogReducer'
import { setVisibility } from './reducers/visibilityReducer'
import { setUser } from './reducers/userReducer'
import LoggedUserView from './components/LoggedUserView'

const App = ({ setUser, ...props }) => {

  const dispatch = useDispatch()

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

  return <div className="container">
          {props.user === null ? <LoginForm /> : <LoggedUserView />}
        </div>
}

const mapStateToProps = (state) => {
  return {
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