import { connect, } from 'react-redux'
import { Link } from "react-router-dom"
import Table from 'react-bootstrap/Table'

const BlogList = (props) => {
  
  if (props.blogs.length !== 0) {
    return (
      <>
        <Table striped bordered>
          <tbody>
            {props.blogs.map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,  
  }
}

const ConnectedBlogList= connect(mapStateToProps)(BlogList)
export default ConnectedBlogList