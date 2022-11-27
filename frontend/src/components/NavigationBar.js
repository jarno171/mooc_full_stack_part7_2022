import { setUser, } from '../reducers/userReducer'
import { connect, } from 'react-redux'
import { Link, } from "react-router-dom"
import { Nav, Navbar } from 'react-bootstrap'

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
      <h1>blogs</h1>

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
         <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">blogs</Link>
          </Nav.Link>

          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">users</Link>
          </Nav.Link>

          <Nav.Link href="#" as="span">
            <button style={padding} onClick={() => handleLogout(props.setUser)}>logout</button>
          </Nav.Link>
        </Nav>
       </Navbar.Collapse>
      </Navbar>
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