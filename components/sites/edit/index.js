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
  Tabs,
} from 'antd'
import Router from 'next/router'
import Link from 'next/link'

import Loader from '../../common/loader'

const fetchSiteQuery = gql`
  query($id: uuid!) {
    site_by_pk(id: $id) {
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
const updateSiteMutation = gql`
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
    update_site(
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

const SitesEdit = props => {
  const handleSubmit = () => {
    props.form.validateFields(async (err, values) => {
      if (!err) {
        await props.client.mutate({
          mutation: updateSiteMutation,
          variables: {
            id: props.id,
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

        Router.push(`/sites/show?id=${props.id}`, `/sites/${props.id}`)
      }
    })
  }

  const { getFieldDecorator } = props.form

  return (
    <Query
      query={fetchSiteQuery}
      variables={{ id: props.id }}
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
        } = data.site_by_pk

        return (
          <Fragment>
            <div className="border border-solid border-gray-300 border-t-0 border-l-0 border-r-0 bg-white">
              <PageHeader
                onBack={() => Router.push('/sites')}
                title={`Edit ${name}`}
              >
                <p className="text-xs text-gray-500 font-hairline mb-0">
                  You can edit {name} by providing the necessary details
                </p>
              </PageHeader>
            </div>
            <Row>
              <Col sm={24} md={12}>
                <div className="m-8 bg-white rounded border border-solid border-gray-300">
                  <Card bordered={false}>
                    <Form layout="vertical" onSubmit={handleSubmit}>
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
                  <div className="py-4 px-6 bg-gray-100">
                    <div className="flex justify-end">
                      <div className="mr-4">
                        <Link href={`/sites`} as={`/sites`}>
                          <Button
                            loading={loading}
                            size="large"
                            icon="close-circle"
                          >
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
      }}
    </Query>
  )
}

export default withApollo(Form.create()(SitesEdit))
