import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Card, Col, Row, Icon, Avatar } from 'antd'
import styled from 'styled-components'

const PROJECT_QUERY = gql`
  query PROJECT_QUERY($id: ID!) {
    project(id: $id) {
      id
      title
      content
      admin {
        name
      }
    }
  }
`
const StyledCardContent = styled.div`
  margin-bottom: 16px;
  width: ${props => props.listCount * (300 + 48)}px;
  display: flex;

  > .ant-card {
    width: 285px;
    margin-right: 48px;

    > .ant-card-head {
      border-bottom: 0;
      padding: 0 24px;

      .ant-card-head-title {
        padding: 24px 0;
        max-width: 80%;
      }
    }

    > .ant-card-body {
      padding: 0;
      color: #9e9e9e;
    }
  }
`
const StyledCardBody = styled.div`
  padding: 0 24px 24px;
`

class Projects extends Component {
  state = {
    lists: [
      {
        id: 1,
        name: 'List 1',
      },
      {
        id: 2,
        name: 'List 2',
      },
      {
        id: 3,
        name: 'List 3',
      },
      {
        id: 4,
        name: 'List 4',
      },
      {
        id: 5,
        name: 'List 5',
      },
    ],
  }

  render() {
    return (
      <Query query={PROJECT_QUERY} variables={{ id: this.props.id }}>
        {({ data, error, loading }) => {
          if (loading) return <div>Loading...</div>
          if (error) return <p>Error: {error.message}</p>

          return (
            <StyledCardContent listCount={this.state.lists.length}>
              {this.state.lists.map((list, index) => {
                return (
                  <Card
                    key={index}
                    title={list.name}
                    extra={<Icon type="setting" />}
                  />
                )
              })}
            </StyledCardContent>
          )
        }}
      </Query>
    )
  }
}

export default Projects
