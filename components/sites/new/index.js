import React, { Component, Fragment } from 'react'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'
import { graphql, withApollo, useMutation } from 'react-apollo'
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
  Icon,
} from 'antd'
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
          title={<div style={{ margin: '12px 0 0 12px' }}>Create New Site</div>}
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
            <Card bordered={false}>
              <Form layout="vertical" onSubmit={handleSubmit}>
                <Form.Item label="Name">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please enter name!' }],
                  })(<Input placeholder="Please enter name" size="large" />)}
                </Form.Item>
              </Form>
            </Card>
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
