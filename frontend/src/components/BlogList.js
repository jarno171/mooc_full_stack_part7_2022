import { connect, } from 'react-redux'
import Blog from './Blog'

const BlogList = (props) => {
  return (
    <div>
      {props.blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,  
  }
}

const ConnectedBlogList= connect(mapStateToProps)(BlogList)
export default ConnectedBlogList