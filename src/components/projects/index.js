import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Card, Col, Row, Icon, Avatar } from 'antd'
import styled from 'styled-components'

const PROJECTS_QUERY = gql`
  query PROJECTS_QUERY {
    projects {
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

  > .ant-card {
    > .ant-card-head {
      border-bottom: 0;

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
const StyledCardFooter = styled.div`
  padding: 24px;
  background-color: #e8e8e836;
`

class UserProfile extends Component {
  render() {
    return (
      <Query query={PROJECTS_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <div>Loading...</div>
          if (error) return <p>Error: {error.message}</p>

          return (
            <Row gutter={16}>
              {data.projects.map(project => (
                <Col span={8}>
                  <StyledCardContent>
                    <Card
                      key={project.id}
                      title={project.title}
                      extra={<Icon type="setting" />}
                    >
                      <StyledCardBody>{project.content}</StyledCardBody>
                      <StyledCardFooter>
                        <Avatar
                          style={{
                            color: '#e6f7ff',
                            backgroundColor: '#1890ff',
                          }}
                        >
                          {project.admin.name.split('')[0]}
                        </Avatar>
                      </StyledCardFooter>
                    </Card>
                  </StyledCardContent>
                </Col>
              ))}
            </Row>
          )
        }}
      </Query>
    )
  }
}

export default UserProfile
