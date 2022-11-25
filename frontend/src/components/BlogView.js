import { useParams } from "react-router-dom"
import { connect, } from 'react-redux'
import blogService from '../services/blogs'
import store from '../store'
import { addLike } from '../reducers/blogReducer'
import { setComment, resetComment } from "../reducers/commentReducer"

const handleAddLike = async (blog) => {
  const updatedBlog = {
    ...blog,
    likes: blog.likes + 1,
  }

  await blogService.update(updatedBlog)

  store.dispatch(addLike(updatedBlog.id))
}

const handleAddComment = async (event, blog) => {
  event.preventDefault()

  const comment = event.target.comment.value

  blogService.addComment(blog.id, comment)

  store.dispatch(resetComment())
}

const BlogView = (props) => {
  const id = useParams().id

  const blog = props.blogs.find((blog) => blog.id === id)

  if (blog) {
    const url = (blog.url.indexOf('://') === -1) ? 'https://' + blog.url : blog.url
    return (
      <>
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

      <div>
        <div>
          <h2>comments</h2>
          <form onSubmit={e => handleAddComment(e, blog)}>
            <div>
              <input
                type="text"
                value={props.comment}
                name="comment"
                onChange={({ target }) => props.setComment(target.value)}
              />
            </div>

            <button type="submit">add comment</button>
          </form>
        </div>
      </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,    
    comment: state.comment,
  }
}

const mapDispatchToProps = {
  setComment,
  resetComment,
}

const ConnectedBlogView = connect(mapStateToProps, mapDispatchToProps)(BlogView)
export default ConnectedBlogView