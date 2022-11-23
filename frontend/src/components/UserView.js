import { useParams } from "react-router-dom"
import { connect, } from 'react-redux'

const UserView = (props) => {
  const id = useParams().id

  const userBlogs = props.blogs.filter((blog) => blog.user.id === id)

  return (
    <div>
      <h4>added blogs</h4>

      {userBlogs.map((blog) => (
        <li key={blog.id}>
          {blog.title}
        </li>
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,    
  }
}

const ConnectedUserView = connect(mapStateToProps)(UserView)
export default ConnectedUserView