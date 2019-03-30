import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Card, Col, Row, Icon, Button } from 'antd'
import styled from 'styled-components'
import Link from 'next/link'

const PROJECTS_QUERY = gql`
  query PROJECTS_QUERY {
    projects {
      id
      title
      content
      admin {
        email
      }
    }
  }
`
const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const StyledMeta = styled.div``
const StyledTitle = styled.div`
  margin: 24px 0;
  font-weight: 600;
  font-size: 20px;
`
const StyledLoader = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

class Projects extends Component {
  render() {
    return (
      <Query query={PROJECTS_QUERY}>
        {({ data, error, loading }) => {
          if (loading)
            return (
              <StyledLoader>
                <img src={require('../../../static/images/logo.png')} />
              </StyledLoader>
            )
          if (error) return <p>Error: {error.message}</p>

          return (
            <Fragment>
              <Row gutter={48}>
                <Col span={24}>
                  <StyledHeader>
                    <StyledTitle>Projects</StyledTitle>
                    <StyledMeta>
                      <Button
                        type="primary"
                        shape="round"
                        icon="plus"
                        size="large"
                      >
                        New Project
                      </Button>
                    </StyledMeta>
                  </StyledHeader>
                </Col>
              </Row>
              <Row gutter={48}>
                {data.projects.map(project => (
                  <Col span={6} key={project.id}>
                    <Link
                      href={`/projects/show?id=${project.id}`}
                      as={`/projects/${project.id}`}
                    >
                      <a>
                        <Card
                          key={project.id}
                          title={project.title}
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
