import React, { Component } from 'react'
import styled from 'styled-components'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'
import { graphql, withApollo, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Form, Button, Input } from 'antd'
import Router from 'next/router'
import Link from 'next/link'
import { Cookies } from 'js-cookie'

const createProjectMutation = gql`
  mutation($name: String, $user_id: uuid) {
    insert_project(
      objects: { name: $name, users: { data: { user_id: $user_id } } }
    ) {
      returning {
        id
      }
    }
  }
`

class ProjectsNew extends Component {
  handleSubmit = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        await this.props.client.mutate({
          mutation: createProjectMutation,
          variables: {
            name: values.name,
            user_id: this.props.serverState.userId,
          },
        })

        Router.push('/projects')
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Mutation mutation={createProjectMutation}>
        {({ loading, error }) => {
          if (loading)
            return (
              <p className="flex justify-center items-center min-h-screen">
                Loading...
              </p>
            )

          if (error) return <p>Error: {error.message}</p>

          return (
            <div className="flex justify-center flex-col ml-auto mr-auto bg-white rounded border border-solid border-gray-300">
              <div className="p-8 border-0 border-b border-solid border-gray-300">
                <h2 className="text-3xl mb-1 text-gray-700">
                  Create new Project
                </h2>
                <p className="text-sm mb-0 text-gray-500">
                  You can add a new project by providing the necessary details
                </p>
              </div>
              <div className="p-8 border-0 border-b border-solid border-gray-300">
                <Form layout="vertical" onSubmit={this.handleSubmit}>
                  <Form.Item label="Name">
                    {getFieldDecorator('name', {
                      rules: [
                        { required: true, message: 'Please enter name!' },
                      ],
                    })(<Input placeholder="Please enter name" size="large" />)}
                  </Form.Item>
                </Form>
              </div>
              <div className="flex justify-end p-8 bg-gray-100">
                <div className="mr-4">
                  <Link href={`/projects`} as={`/projects`}>
                    <Button
                      loading={loading}
                      size="large"
                      icon="close-circle"
                      type="danger"
                    >
                      Cancel
                    </Button>
                  </Link>
                </div>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={this.handleSubmit}
                  loading={loading}
                  size="large"
                  icon="check-circle"
                >
                  Save
                </Button>
              </div>
            </div>
          )
        }}
      </Mutation>
    )
  }
}

export default withApollo(Form.create()(ProjectsNew))
