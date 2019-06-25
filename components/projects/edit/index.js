import React, { Component, Fragment } from 'react'
import gql from 'graphql-tag'
import { graphql, withApollo, Query } from 'react-apollo'
import {
  Form,
  Button,
  Input,
  PageHeader,
  Typography,
  Card,
  Row,
  Col,
} from 'antd'
import styled from 'styled-components'
import Router from 'next/router'
import Link from 'next/link'

import Loader from '../../common/loader'

const fetchProjectQuery = gql`
  query($id: uuid!) {
    project_by_pk(id: $id) {
      id
      name
      login_url
      username_or_email_address_field_selector
      username_or_email_address_field_value
      password_field_selector
      password_field_value
      submit_button_selector
      users {
        id
      }
    }
  }
`
const updateProjectMutation = gql`
  mutation(
    $name: String
    $login_url: String
    $username_or_email_address_field_selector: String
    $username_or_email_address_field_value: String
    $password_field_selector: String
    $password_field_value: String
    $submit_button_selector: String
    $id: uuid!
  ) {
    update_project(
      where: { id: { _eq: $id } }
      _set: {
        name: $name
        login_url: $login_url
        username_or_email_address_field_selector: $username_or_email_address_field_selector
        username_or_email_address_field_value: $username_or_email_address_field_value
        password_field_selector: $password_field_selector
        password_field_value: $password_field_value
        submit_button_selector: $submit_button_selector
      }
    ) {
      returning {
        id
        name
        login_url
        username_or_email_address_field_selector
        username_or_email_address_field_value
        password_field_selector
        password_field_value
        submit_button_selector
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
            login_url: values.login_url,
            username_or_email_address_field_selector:
              values.username_or_email_address_field_selector,
            username_or_email_address_field_value:
              values.username_or_email_address_field_value,
            password_field_selector: values.password_field_selector,
            password_field_value: values.password_field_value,
            submit_button_selector: values.submit_button_selector,
            cookies: values.cookies,
          },
        })

        Router.push(
          `/projects/show?id=${this.props.id}`,
          `/projects/${this.props.id}`
        )
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

          const {
            name,
            login_url,
            username_or_email_address_field_selector,
            username_or_email_address_field_value,
            password_field_selector,
            password_field_value,
            submit_button_selector,
            cookies,
          } = data.project_by_pk

          return (
            <Fragment>
              <div className="border border-solid border-gray-300">
                <PageHeader
                  title={
                    <h2 className="text-3xl mb-0 text-gray-700">
                      Create new Project
                    </h2>
                  }
                >
                  <p className="text-sm mb-0 text-gray-700">
                    You can add a new project by providing the necessary details
                  </p>
                </PageHeader>
              </div>
              <div className="mt-8 flex justify-center flex-col ml-auto mr-auto bg-white rounded border border-solid border-gray-300">
                <Card title="Details" bordered={false}>
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
                </Card>
                <div className="flex justify-end p-6 bg-gray-100">
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
              <div className="mt-8 flex justify-center flex-col ml-auto mr-auto bg-white rounded border border-solid border-gray-300">
                <Card title="Authentication" bordered={false}>
                  <Form layout="vertical" onSubmit={this.handleSubmit}>
                    <Row>
                      <Col sm={24} md={24}>
                        <Form.Item label="Login URL">
                          {getFieldDecorator('login_url', {
                            rules: [
                              {
                                message: 'Please enter login URL!',
                              },
                            ],
                            initialValue: login_url,
                          })(
                            <Input
                              placeholder="Please enter login URL"
                              size="large"
                            />
                          )}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={48}>
                      <Col sm={24} md={12}>
                        <Form.Item label="Username or Email Address field selector">
                          {getFieldDecorator(
                            'username_or_email_address_field_selector',
                            {
                              rules: [
                                {
                                  message:
                                    'Please enter Username or Email Address field selector!',
                                },
                              ],
                              initialValue: username_or_email_address_field_selector,
                            }
                          )(
                            <Input
                              placeholder="Please enter Username or Email Address field selector"
                              size="large"
                            />
                          )}
                        </Form.Item>
                      </Col>
                      <Col sm={24} md={12}>
                        <Form.Item label="Username or Email Address field value">
                          {getFieldDecorator(
                            'username_or_email_address_field_value',
                            {
                              rules: [
                                {
                                  message:
                                    'Please enter Username or Email Address field value!',
                                },
                              ],
                              initialValue: username_or_email_address_field_value,
                            }
                          )(
                            <Input
                              placeholder="Please enter Username or Email Address field value"
                              size="large"
                            />
                          )}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={48}>
                      <Col sm={24} md={12}>
                        <Form.Item label="Password field selector">
                          {getFieldDecorator('password_field_selector', {
                            rules: [
                              {
                                message:
                                  'Please enter Password field selector!',
                              },
                            ],
                            initialValue: password_field_selector,
                          })(
                            <Input
                              placeholder="Please enter Username or Email Address field selector"
                              size="large"
                            />
                          )}
                        </Form.Item>
                      </Col>
                      <Col sm={24} md={12}>
                        <Form.Item label="Password field value">
                          {getFieldDecorator('password_field_value', {
                            rules: [
                              {
                                message: 'Please enter Password field value!',
                              },
                            ],
                            initialValue: password_field_value,
                          })(
                            <Input
                              placeholder="Please enter Password field value"
                              size="large"
                            />
                          )}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={48}>
                      <Col sm={12} md={12}>
                        <Form.Item label="Submit Button selector">
                          {getFieldDecorator('submit_button_selector', {
                            rules: [
                              {
                                message: 'Please enter Submit Button selector!',
                              },
                            ],
                            initialValue: submit_button_selector,
                          })(
                            <Input
                              placeholder="Please enter Submit Button selector"
                              size="large"
                            />
                          )}
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Card>
                <div className="flex justify-end p-6 bg-gray-100">
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
