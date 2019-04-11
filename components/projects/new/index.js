import React, { Component, PureComponent, Fragment } from 'react'
import styled from 'styled-components'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { Form, Button, Col, Row, Input } from 'antd'
import Router from 'next/router'

const createProject = gql`
  mutation CREATE_PROJECT($name: String) {
    createProject(input: { data: { name: $name } }) {
      project {
        _id
        name
        users {
          _id
        }
      }
    }
  }
`

class ProjectNew extends Component {
  onClose = () => {
    Router.push('/projects')
  }

  handleSubmit = createProject => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        await createProject({
          variables: {
            name: values.name,
          },
        })

        Router.push('/projects')
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Mutation mutation={createProject}>
        {(createProject, { loading, error }) => {
          if (loading) return <p>Loading</p>

          if (error) return <p>Error: {error.message}</p>

          return (
            <Fragment>
              <Form
                layout="vertical"
                onSubmit={() => this.handleSubmit(createProject)}
              >
                <Form.Item label="Name">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please enter name!' }],
                  })(<Input placeholder="Please enter name" />)}
                </Form.Item>
              </Form>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => this.handleSubmit(createProject)}
                loading={loading}
              >
                Submit
              </Button>
            </Fragment>
          )
        }}
      </Mutation>
    )
  }
}

export default Form.create()(ProjectNew)
