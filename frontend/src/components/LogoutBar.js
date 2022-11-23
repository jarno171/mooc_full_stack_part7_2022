import { setUser } from '../reducers/userReducer'
import { connect, } from 'react-redux'

const handleLogout = (setUser) => {
  window.localStorage.removeItem('loggedBlogappUser')
  setUser(null)
}

const LogoutBar = (props) => {
  return (
    <>
      <h2>blogs</h2>
      <p>
        {props.user.name} logged in
        <button onClick={() => handleLogout(props.setUser)}>logout</button>
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