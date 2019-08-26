import React, { Component, Fragment } from 'react'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'
import { graphql, withApollo, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Form,
  Button,
  Input,
  PageHeader,
  Typography,
  Card,
  Row,
  Col,
  Tabs,
} from 'antd'
import Router from 'next/router'
import Link from 'next/link'

import Loader from '../../common/loader'

const createProjectMutation = gql`
  mutation(
    $name: String
    $login_url: String
    $username_or_email_address_field_selector: String
    $username_or_email_address_field_value: String
    $password_field_selector: String
    $password_field_value: String
    $submit_button_selector: String
    $user_id: uuid
  ) {
    insert_project(
      objects: {
        name: $name
        login_url: $login_url
        username_or_email_address_field_selector: $username_or_email_address_field_selector
        username_or_email_address_field_value: $username_or_email_address_field_value
        password_field_selector: $password_field_selector
        password_field_value: $password_field_value
        submit_button_selector: $submit_button_selector
        users: { data: { user_id: $user_id } }
      }
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
            login_url: values.login_url,
            username_or_email_address_field_selector:
              values.username_or_email_address_field_selector,
            username_or_email_address_field_value:
              values.username_or_email_address_field_value,
            password_field_selector: values.password_field_selector,
            password_field_value: values.password_field_value,
            submit_button_selector: values.submit_button_selector,
            user_id: this.props.userId,
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
          if (loading) return <Loader />

          if (error) return <p>Error: {error.message}</p>

          return (
            <Fragment>
              <div className="border border-solid border-gray-300">
                <PageHeader
                  onBack={() => Router.push('/projects')}
                  title={
                    <h2 className="text-3xl m-2 text-gray-700">
                      Create new Project
                    </h2>
                  }
                  subTitle={
                    <p className="text-sm mb-0 text-gray-700">
                      You can add a new project by providing the necessary
                      details
                    </p>
                  }
                />
              </div>
              <div className="m-8 bg-white rounded border border-solid border-gray-300">
                <Tabs defaultActiveKey="details" size="large">
                  <Tabs.TabPane tab="Details" key="details">
                    <Card bordered={false}>
                      <Form layout="vertical" onSubmit={this.handleSubmit}>
                        <Form.Item label="Name">
                          {getFieldDecorator('name', {
                            rules: [
                              { required: true, message: 'Please enter name!' },
                            ],
                          })(
                            <Input
                              placeholder="Please enter name"
                              size="large"
                            />
                          )}
                        </Form.Item>
                      </Form>
                    </Card>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Authentication" key="authentication">
                    <Card bordered={false}>
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
                                    message:
                                      'Please enter Password field value!',
                                  },
                                ],
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
                                    message:
                                      'Please enter Submit Button selector!',
                                  },
                                ],
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
                  </Tabs.TabPane>
                </Tabs>
              </div>
              <div className="m-8">
                <div className="flex justify-end">
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
      </Mutation>
    )
  }
}

export default withApollo(Form.create()(ProjectsNew))
