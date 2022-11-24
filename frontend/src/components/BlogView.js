import { useParams } from "react-router-dom"
import { connect, } from 'react-redux'
import blogService from '../services/blogs'
import store from '../store'
import { addLike } from '../reducers/blogReducer'
import { Link } from "react-router-dom"

const handleAddLike = async (blog) => {
  const updatedBlog = {
    ...blog,
    likes: blog.likes + 1,
  }

  await blogService.update(updatedBlog)

  store.dispatch(addLike(updatedBlog.id))
}

const BlogView = (props) => {
  const id = useParams().id

  const blog = props.blogs.find((blog) => blog.id === id)

  if (blog) {
    const url = (blog.url.indexOf('://') === -1) ? 'https://' + blog.url : blog.url
    return (
      <div>
        <h2>
          {blog.title}
        </h2>

        <p>
          <a rel={'external noreferrer'} target="_blank" href={url} >{url}</a>
        </p>

        <p>
          likes {blog.likes}{' '}
            <button id="like-button" onClick={() => handleAddLike(blog)}>
              like
            </button>
        </p>

        <p>
          added by {blog.author}
        </p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,    
  }
}

const ConnectedBlogView = connect(mapStateToProps)(BlogView)
export default ConnectedBlogView