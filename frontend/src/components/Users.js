import { connect, } from 'react-redux'

const _ = require('lodash')

const UserPrint = (props) => {
  return (
    <>
      <td>{props.name}</td><td>{props.count}</td>
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

      <table>
        <tbody>
          <tr><th></th><th>Blogs created</th></tr>

            {usersUnique.map((user) => (
              <tr key={user.name}>
                <UserPrint name={user.name}
                           count={userCount[user.name]}
                />
              </tr>
            ))}
        </tbody>
      </table>
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