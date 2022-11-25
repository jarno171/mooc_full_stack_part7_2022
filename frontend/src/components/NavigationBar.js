import { setUser, } from '../reducers/userReducer'
import { connect, } from 'react-redux'
import { Link, } from "react-router-dom"

const handleLogout = (setUser) => {
  window.localStorage.removeItem('loggedBlogappUser')
  setUser(null)
}

const LogoutBar = (props) => {

  const padding = {
    padding: 5
  }

  return (
    <>
      <h2>blogs</h2>
      <p>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>

        {props.user.name} logged in
        <button style={padding} onClick={() => handleLogout(props.setUser)}>logout</button>
      </p>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,    
  }
}

const mapDispatchToProps = {
  setUser,
}

const ConnectedLogoutBar = connect(mapStateToProps, mapDispatchToProps)(LogoutBar)
export default ConnectedLogoutBar