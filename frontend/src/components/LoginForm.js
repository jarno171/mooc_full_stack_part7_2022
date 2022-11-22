import loginService from '../services/login'
import { createError } from '../reducers/errorReducer'
import ErrorBar from './Errorbar'
import { connect, } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setUsername } from '../reducers/usernameReducer'
import { setPassword } from '../reducers/passwordReducer'
import blogService from '../services/blogs'
import store from '../store'

const handleLogin = async (event) => {
  event.preventDefault()

  const formValues = event.target

  try {
    const user = await loginService.login({
      username: formValues.username.value,
      password: formValues.password.value,
    })

    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    blogService.setToken(user.token)

    store.dispatch(setUser(user))
    store.dispatch(setUsername(''))
    store.dispatch(setPassword(''))
  } catch (exception) {
    createError('Wrong credentials')
  }
}

const LoginForm = (props) => {
  return (
    <div>
      <h2>Login</h2>

      <ErrorBar message={props.error} />

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={props.username}
            name="username"
            onChange={({ target }) => props.setUsername(target.value)}
          />
        </div>

        <div>
          password
          <input
            type="password"
            value={props.password}
            name="password"
            onChange={({ target }) => props.setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    username: state.username,
    password: state.password,
    error: state.error,
  }
}

const mapDispatchToProps = {
  setUsername,
  setPassword,
}

const ConnectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)
export default ConnectedLoginForm
