import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id
      name
      projects {
        id
        title
        content
      }
    }
  }
`

class UserProfile extends Component {
  render() {
    return (
      <Query query={ME_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <div>Loading...</div>
          if (error) return <p>Error: {error.message}</p>

          return (
            <div>
              {data.me.projects.map(project => (
                <div key={project.id}>
                  <h2>{project.title}</h2>
                  <p>{project.content}</p>
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
