import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Card, Col, Row, Icon, Avatar } from 'antd'
import styled from 'styled-components'
import Link from 'next/link'

import Board from './board'

const PROJECT_QUERY = gql`
  query PROJECT_QUERY($id: ID!) {
    projects_by_pk(id: $id) {
      id
      title
      content
      admin {
        email
      }
      columns {
        id
        title
        tasks {
          id
          content
        }
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
  margin: 24px 0;
  font-weight: 600;
  font-size: 20px;
  display: flex;
`
const StyledCardBody = styled.div`
  padding: 0 24px 24px;
`
const StyledScrollCol = styled(Col)`
  overflow-x: scroll;
  min-height: calc(100vh - 180px);
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
      <Query query={PROJECT_QUERY} variables={{ id: this.props.id }}>
        {({ data, error, loading }) => {
          if (loading)
            return (
              <StyledLoader>
                <img src={require('../../../static/images/logo.png')} />
              </StyledLoader>
            )
          if (error) return <p>Error: {error.message}</p>

          const { admin, title, columns } = data.projects_by_pk

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
                  <Board columns={columns} />
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
