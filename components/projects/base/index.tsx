import React, { Fragment } from 'react'
import { withApollo, Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Card, Col, Row, Button } from 'antd'
import Link from 'next/link'

import Loader from '../../common/loader'

const fetchProjectsQuery = gql`
  query {
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

const ProjectsIndex = () => {
  return (
    <Query query={fetchProjectsQuery} fetchPolicy="network-only">
      {({ data, error, loading }) => {
        if (loading) return <Loader />

        if (error) return <p>Error: {error.message}</p>

        return (
          <Fragment>
            <div className="flex flex-row-reverse">
              <Link href={`/projects/new`} as={`/projects/new`}>
                <Button type="primary" icon="plus-circle" size="large">
                  New Project
                </Button>
              </Link>
            </div>
            <div className="mt-8">
              <Row gutter={32}>
                {data.projects.map(
                  (project: { _id: number; name: string; user: [] }) => {
                    return (
                      <Col key={project._id} md={12} lg={6} className="mb-8">
                        <Link
                          href={`/projects/show?id=${project._id}`}
                          as={`/projects/${project._id}`}
                        >
                          <a>
                            <Card type="inner" title={project.name} hoverable>
                              {project.user ? project.user.length : 0} users
                            </Card>
                          </a>
                        </Link>
                      </Col>
                    )
                  }
                )}
              </Row>
            </div>
          </Fragment>
        )
      }}
    </Query>
  )
}

export default withApollo(ProjectsIndex)
