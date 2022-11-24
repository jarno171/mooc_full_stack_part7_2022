import BlogList from './BlogList'
import AddNewBlog from './AddNewBlog'
import UserView from './UserView'
import BlogView from './BlogView'

import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom"

import LogoutBar from './LogoutBar'
import Users from './Users'

const LoggedUserView = () => {
  return (
    <div>
      <LogoutBar />

      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <BlogList />
              <AddNewBlog />
            </>
            } />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserView />} />
          <Route path="/blogs/:id" element={<BlogView />} />
        </Routes>
      </Router>
      
      
    </div>
  )
}

export default LoggedUserView