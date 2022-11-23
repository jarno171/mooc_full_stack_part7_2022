import { connect, } from 'react-redux'

const _ = require('lodash')

const UserPrint = (props) => {
  return (
    <>
      {props.name} {props.count}
    </>
  )
}

const Users = (props) => {
  const users = props.blogs.map(blog => blog.user)
  const userCount = _.countBy(users, 'name')
  const usersUnique = _.uniqBy(users, 'name')
  return (
    <div>
      <h3>Users</h3>

      {usersUnique.map((user) => (
        <UserPrint name={user.name}
                   count={userCount[user.name]}
                   key={user.name}
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

const ConnectedUsers = connect(mapStateToProps)(Users)
export default ConnectedUsers