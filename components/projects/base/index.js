import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Card, Col, Row, Icon, Button } from 'antd'
import styled from 'styled-components'
import Link from 'next/link'

const projectsQuery = gql`
  query PROJECTS_QUERY {
    projects {
      _id
      name
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
      <Query query={projectsQuery}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading</p>

          if (error) return <p>Error: {error.message}</p>

          const { _id } = data.projects

          return (
            <Fragment>
              <Row gutter={48}>
                <Col span={24}>
                  <Link href={`/projects/new`} as={`/projects/new`}>
                    <Button type="primary" icon="plus" size="large">
                      New Project
                    </Button>
                  </Link>
                </Col>
              </Row>
              <Row gutter={48}>
                {data.projects.map(project => (
                  <Col span={6} key={project._id}>
                    <Link
                      href={`/projects/show?id=${project._id}`}
                      as={`/projects/${project._id}`}
                    >
                      <a>
                        <Card
                          key={project._id}
                          title={project.name}
                          extra={<Icon type="setting" />}
                          hoverable
                        >
                          {project.content}
                        </Card>
                      </a>
                    </Link>
                  </Col>
                ))}
              </Row>
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export default Projects
