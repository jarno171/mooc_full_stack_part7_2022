import { connect, } from 'react-redux'
import Notification from './Notification'
import BlogForm from './BlogForm'
import { setVisibility } from '../reducers/visibilityReducer'

const AddNewBlog = (props) => {
  const hideWhenVisible = { display: props.visibility ? 'none' : '' }
  const showWhenVisible = { display: props.visibility ? '' : 'none' }

  return (
    <div>
      <Notification message={props.notification} />

      <div style={hideWhenVisible}>
        <button onClick={() => props.setVisibility(true)}>
          add a new blog
        </button>
      </div>

      <div style={showWhenVisible}>
        <BlogForm />
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    notification: state.notification,  
    visibility: state.visibility,
  }
}

const mapDispatchToProps = {
  setVisibility,
}

const ConnectedAddNewBlog = connect(mapStateToProps, mapDispatchToProps)(AddNewBlog)
export default ConnectedAddNewBlog