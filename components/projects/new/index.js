import React, { Component, PureComponent, Fragment } from 'react'
import styled from 'styled-components'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Icon,
} from 'antd'
import Router from 'next/router'
import ProjectsBase from '../base'

const INSERT_PROJECTS = gql`
  mutation INSERT_PROJECTS($title: String, $content: String, $admin_id: uuid) {
    insert_projects(
      objects: { title: $title, content: $content, admin_id: $admin_id }
    ) {
      returning {
        id
        title
        content
        admin {
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

class ProjectNew extends Component {
  onClose = () => {
    Router.push('/projects')
  }

  handleSubmit = insert_projects => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        await insert_projects({
          variables: {
            title: values.title,
            content: values.content,
            admin_id: this.props.adminId,
          },
        })

        Router.push('/projects')
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Mutation mutation={INSERT_PROJECTS}>
        {(insert_projects, { loading, error }) => {
          if (loading)
            return (
              <StyledLoader>
                <img src={require('../../../static/images/logo.png')} />
              </StyledLoader>
            )

          if (error) return <p>Error: {error.message}</p>

          return (
            <Fragment>
              <ProjectsBase />
              <Drawer
                title="Create a new account"
                width={720}
                visible
                onClose={this.onClose}
              >
                <Form
                  layout="vertical"
                  onSubmit={() => this.handleSubmit(insert_projects)}
                >
                  <Form.Item label="Title">
                    {getFieldDecorator('title', {
                      rules: [
                        { required: true, message: 'Please enter title!' },
                      ],
                    })(<Input placeholder="Please enter title" />)}
                  </Form.Item>
                  <Form.Item label="Content">
                    {getFieldDecorator('content')(
                      <Input placeholder="Please enter content" />
                    )}
                  </Form.Item>
                </Form>
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    borderTop: '1px solid #e9e9e9',
                    padding: '10px 16px',
                    background: '#fff',
                    textAlign: 'right',
                  }}
                >
                  <Button
                    onClick={this.onClose}
                    style={{ marginRight: 8 }}
                    loading={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => this.handleSubmit(insert_projects)}
                    loading={loading}
                  >
                    Submit
                  </Button>
                </div>
              </Drawer>
            </Fragment>
          )
        }}
      </Mutation>
    )
  }
}

export default Form.create()(ProjectNew)
