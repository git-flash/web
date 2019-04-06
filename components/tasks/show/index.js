import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Card, Col, Row, Icon, Avatar, Modal } from 'antd'
import styled from 'styled-components'
import Link from 'next/link'
import Router from 'next/router'

import ProjectsShow from '../../projects/show'
import initialData from '../../projects/show/initial-data'

const TASK_QUERY = gql`
  query TASK_QUERY($id: uuid!) {
    tasks_by_pk(id: $id) {
      id
      content
      column {
        project {
          id
        }
      }
    }
  }
`
const StyledLoader = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

class TasksShow extends Component {
  state = {
    showModal: true,
  }

  handleClose = projectId => {
    this.setState({ showModal: false }, () => {
      Router.push(`/projects/show?id=${projectId}`, `/projects/${projectId}`)
    })
  }

  render() {
    return (
      <Query query={TASK_QUERY} variables={{ id: this.props.id }}>
        {({ data, error, loading }) => {
          if (loading)
            return (
              <StyledLoader>
                <img src={require('../../../static/images/logo.png')} />
              </StyledLoader>
            )
          if (error) return <p>Error: {error.message}</p>

          const { content, column } = data.tasks_by_pk

          return (
            <Fragment>
              <ProjectsShow id={column.project.id} />
              <Modal
                centered
                destroyOnClose
                title="Basic Modal"
                width={800}
                visible={this.state.showModal}
                onOk={() => this.handleClose(column.project.id)}
                onCancel={() => this.handleClose(column.project.id)}
              >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Modal>
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export default TasksShow
