import React, { Component, Fragment } from 'react'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'
import { graphql, withApollo, useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import Card from 'antd/lib/card'
import Button from 'antd/lib/button'
import PageHeader from 'antd/lib/page-header'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Typography from 'antd/lib/typography'
import Tabs from 'antd/lib/tabs'
import Icon from 'antd/lib/icon'
import Router from 'next/router'
import Link from 'next/link'
import { withRouter } from 'next/router'

import Loader from '../../common/loader'

const createSiteMutation = gql`
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
    insert_site(
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

const SitesNew = props => {
  const handleSubmit = () => {
    props.form.validateFields(async (err, values) => {
      if (!err) {
        const res = await props.client.mutate({
          mutation: createSiteMutation,
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
            user_id: props.userId,
          },
        })

        props.router.push(
          `/sites/show?id=${res.data.insert_site.returning[0].id}`,
          `/sites/${res.data.insert_site.returning[0].id}`
        )
      }
    })
  }

  const { getFieldDecorator } = props.form

  const { data, loading, error } = useMutation(createSiteMutation)

  if (loading) return <Loader />

  if (error) return <p>Error: {error.message}</p>

  return (
    <Fragment>
      <div className="border border-solid border-gray-300 border-t-0 border-l-0 border-r-0 bg-white">
        <PageHeader
          onBack={() => Router.push('/sites')}
          title={
            <div style={{ margin: '12px 0 12px 12px' }}>Create New Site</div>
          }
          backIcon={
            <div style={{ margin: '12px -12px 0 12px' }}>
              <Icon type="arrow-left" />
            </div>
          }
        />
      </div>
      <Row>
        <Col sm={24} md={18}>
          <div className="m-8 bg-white rounded border border-solid border-gray-300">
            <Tabs defaultActiveKey="details" size="large">
              <Tabs.TabPane tab="Details" key="details">
                <Card bordered={false}>
                  <Form layout="vertical" onSubmit={handleSubmit}>
                    <Form.Item label="Name">
                      {getFieldDecorator('name', {
                        rules: [
                          { required: true, message: 'Please enter name!' },
                        ],
                      })(
                        <Input placeholder="Please enter name" size="large" />
                      )}
                    </Form.Item>
                  </Form>
                </Card>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Authentication" key="authentication">
                <Card bordered={false}>
                  <Form layout="vertical" onSubmit={handleSubmit}>
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
                                message: 'Please enter Password field value!',
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
                                message: 'Please enter Submit Button selector!',
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
            <div className="py-4 px-6 bg-gray-100">
              <div className="flex justify-end">
                <div className="mr-4">
                  <Link href={`/sites`} as={`/sites`}>
                    <Button loading={loading} size="large" icon="close-circle">
                      Cancel
                    </Button>
                  </Link>
                </div>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={handleSubmit}
                  loading={loading}
                  size="large"
                  icon="check-circle"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Fragment>
  )
}

export default withRouter(withApollo(Form.create()(SitesNew)))
