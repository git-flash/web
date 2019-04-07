import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Subscription } from 'react-apollo'
import { Card, Col, Row, Icon, Button } from 'antd'
import styled from 'styled-components'
import Link from 'next/link'

const PROJECTS_SUBSCRIPTION = gql`
  subscription PROJECTS_SUBSCRIPTION {
    projects {
      id
      title
      content
      admin {
        id
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
  margin: 48px 0;
  font-weight: 600;
  font-size: 24px;
`
const StyledLoader = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledCard = styled(Card)`
  height: 128px;
  margin-bottom: 48px;
`

class Projects extends Component {
  render() {
    return (
      <Subscription subscription={PROJECTS_SUBSCRIPTION}>
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
                      <Link href={`/projects/new`} as={`/projects/new`}>
                        <Button type="primary" icon="plus" size="large">
                          New Project
                        </Button>
                      </Link>
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
                        <StyledCard
                          key={project.id}
                          title={project.title}
                          extra={<Icon type="setting" />}
                          hoverable
                        >
                          {project.content}
                        </StyledCard>
                      </a>
                    </Link>
                  </Col>
                ))}
              </Row>
            </Fragment>
          )
        }}
      </Subscription>
    )
  }
}

export default Projects
