import React, { Fragment, useState } from 'react'
import { Modal, Form, Button, Input } from 'antd'
import gql from 'graphql-tag'
import { graphql, withApollo, Mutation } from 'react-apollo'
import Link from 'next/link'

const createPageMutation = gql`
  mutation($page: String, $site_id: uuid) {
    insert_page(objects: { page: $page, site_id: $site_id }) {
      returning {
        page
        id
      }
    }
  }
`

const handleSubmit = props => {
  props.form.validateFields(async (err, values) => {
    if (!err) {
      await props.client.mutate({
        mutation: createPageMutation,
        variables: {
          page: values.page,
          site_id: props.siteId,
        },
      })

      props.form.resetFields()
    }
  })
}

const AddPagesToSite = props => {
  const [visible, setVisibility] = useState(false)
  const { getFieldDecorator } = props.form

  return (
    <Mutation mutation={createPageMutation}>
      {({ error }) => {
        if (error) return <p>Error: {error.message}</p>

        return (
          <Fragment>
            <Button
              onClick={() => setVisibility(true)}
              size="large"
              icon="link"
            >
              Add Pages
            </Button>
            <Modal
              title="Add a new page"
              centered
              visible={visible}
              onOk={() => {
                handleSubmit(props)
                setVisibility(false)
              }}
              onCancel={() => setVisibility(false)}
            >
              <Form layout="vertical" onSubmit={() => handleSubmit(props)}>
                <Form.Item label="Page">
                  {getFieldDecorator('page', {
                    rules: [{ required: true, message: 'Please enter page!' }],
                  })(<Input placeholder="Please enter page" size="large" />)}
                </Form.Item>
              </Form>
            </Modal>
          </Fragment>
        )
      }}
    </Mutation>
  )
}

export default withApollo(Form.create()(AddPagesToSite))
