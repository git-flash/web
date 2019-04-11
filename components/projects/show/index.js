import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Card, Col, Row, Icon, Avatar } from 'antd'
import styled from 'styled-components'
import Link from 'next/link'

const projectQuery = gql`
  query PROJECT_QUERY($id: ID!) {
    project(id: $id) {
      _id
      users {
        _id
        username
      }
    }
  }
`

class Projects extends Component {
  render() {
    return (
      <Query query={projectQuery} variables={{ id: this.props.id }}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading</p>

          if (error) return <p>Error: {error.message}</p>

          const { _id } = data.project

          return (
            <Row gutter={48}>
              <Col span={48}>
                <Link href={`/projects`} as={`/projects`}>
                  <a>
                    <Icon type="arrow-left" />
                  </a>
                </Link>
              </Col>
            </Row>
          )
        }}
      </Query>
    )
  }
}

export default Projects
