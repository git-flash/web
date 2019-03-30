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

class TasksShow extends Component {
  projectId = initialData.tasks[this.props.id].projectId

  state = {
    showModal: true,
  }

  handleClose = () => {
    this.setState({ showModal: false }, () => {
      Router.push(
        `/projects/show?id=${this.projectId}`,
        `/projects/${this.projectId}`
      )
    })
  }

  render() {
    return (
      <Fragment>
        <ProjectsShow id={this.projectId} />
        <Modal
          centered
          destroyOnClose
          title="Basic Modal"
          width={800}
          visible={this.state.showModal}
          onOk={this.handleClose}
          onCancel={this.handleClose}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </Fragment>
    )
  }
}

export default TasksShow
