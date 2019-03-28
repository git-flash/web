import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Card, Col, Row, Icon, Avatar } from 'antd'
import styled from 'styled-components'
import Link from 'next/link'

const PROJECT_QUERY = gql`
  query PROJECT_QUERY($id: ID!) {
    projects_by_pk(id: $id) {
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
const StyledArrow = styled.div`
  margin-right: 24px;
`
const StyledMeta = styled.div``
const StyledTitle = styled.div`
  margin: 24px 0 36px;
  font-weight: 600;
  font-size: 20px;
  display: flex;
`
const StyledCardContent = styled.div`
  margin-bottom: 16px;
  width: ${props => (props.listCount - 1) * (500 + 48)}px;
  display: flex;

  > .ant-card {
    width: 400px;
    margin-right: 48px;

    &:last-child {
      margin-right: 0;
    }

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
const StyledScrollCol = styled(Col)`
  overflow-x: scroll;
  min-height: calc(100vh - 180px);
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

          const { admin, title } = data.projects_by_pk

          return (
            <Fragment>
              <Row gutter={48}>
                <Col span={48}>
                  <StyledHeader>
                    <StyledTitle>
                      <StyledArrow>
                        <Link href={`/projects`} as={`/projects`}>
                          <a>
                            <Icon type="arrow-left" />
                          </a>
                        </Link>
                      </StyledArrow>
                      {title}
                    </StyledTitle>
                    <StyledMeta>{admin.email}</StyledMeta>
                  </StyledHeader>
                </Col>
              </Row>
              <Row gutter={0}>
                <StyledScrollCol span={48}>
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
                </StyledScrollCol>
              </Row>
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export default Projects
