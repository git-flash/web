import React, { Component, Fragment } from 'react'
import gql from 'graphql-tag'
import { graphql, withApollo, Query } from 'react-apollo'
import { Form, Button, Input, PageHeader } from 'antd'
import styled from 'styled-components'
import Router from 'next/router'
import Link from 'next/link'

import Loader from '../../common/loader'

const fetchProjectQuery = gql`
  query($id: uuid!) {
    project_by_pk(id: $id) {
      id
      name
      users {
        id
      }
    }
  }
`
const updateProjectMutation = gql`
  mutation($name: String, $id: uuid!) {
    update_project(where: { id: { _eq: $id } }, _set: { name: $name }) {
      returning {
        id
        name
      }
    }
  }
`

class ProjectsEdit extends Component {
  handleSubmit = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        await this.props.client.mutate({
          mutation: updateProjectMutation,
          variables: {
            id: this.props.id,
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
      <Query
        query={fetchProjectQuery}
        variables={{ id: this.props.id }}
        fetchPolicy="network-only"
      >
        {({ data, error, loading }) => {
          if (loading) return <Loader />

          if (error) return <p>Error: {error.message}</p>

          const { name } = data.project_by_pk

          return (
            <Fragment>
              <div className="border border-solid border-gray-300">
                <PageHeader
                  title={
                    <h2 className="text-3xl mb-0 text-gray-700">Edit {name}</h2>
                  }
                >
                  <p className="text-sm mb-0 text-gray-500">
                    You can add a new project by providing the necessary details
                  </p>
                </PageHeader>
              </div>
              <div className="mt-8 flex justify-center flex-col ml-auto mr-auto bg-white rounded border border-solid border-gray-300">
                <div className="p-8 border-0 border-b border-solid border-gray-300">
                  <Form layout="vertical" onSubmit={this.handleSubmit}>
                    <Form.Item label="Name">
                      {getFieldDecorator('name', {
                        rules: [
                          { required: true, message: 'Please enter name!' },
                        ],
                        initialValue: name,
                      })(
                        <Input placeholder="Please enter name" size="large" />
                      )}
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
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export default withApollo(Form.create()(ProjectsEdit))
