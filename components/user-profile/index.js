import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id
      name
      posts {
        id
        title
      }
    }
  }
`

class UserProfile extends React.Component {
  render() {
    return (
      <Query query={ME_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <div>Loading...</div>
          if (error) return <p>Error: {error.message}</p>

          return (
            <div>
              {data.me.posts.map(post => (
                <div key={post.id}>
                  <h1>{post.title}</h1>
                </div>
              ))}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default UserProfile
