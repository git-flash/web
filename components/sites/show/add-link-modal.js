import React, { Fragment, useState } from 'react'
import { Modal, Form, Button, Input } from 'antd'
import gql from 'graphql-tag'
import { graphql, withApollo, Mutation } from 'react-apollo'
import Link from 'next/link'

const createLinkMutation = gql`
  mutation($link: String, $site_id: uuid) {
    insert_url(objects: { link: $link, site_id: $site_id }) {
      returning {
        link
        id
      }
    }
  }
`

const handleSubmit = props => {
  props.form.validateFields(async (err, values) => {
    if (!err) {
      await props.client.mutate({
        mutation: createLinkMutation,
        variables: {
          link: values.link,
          site_id: props.siteId,
        },
      })

      props.form.resetFields()
    }
  })
}

const AddLinkModal = props => {
  const [visible, setVisibility] = useState(false)
  const { getFieldDecorator } = props.form

  return (
    <Mutation mutation={createLinkMutation}>
      {({ loading, error }) => {
        if (loading)
          return (
            <p className="flex justify-center items-center min-h-screen">
              Loading...
            </p>
          )

        if (error) return <p>Error: {error.message}</p>

        return (
          <Fragment>
            <Button
              onClick={() => setVisibility(true)}
              size="large"
              icon="link"
            >
              Add Links
            </Button>
            <Modal
              title="Add a new link"
              centered
              visible={visible}
              onOk={() => {
                handleSubmit(props)
                setVisibility(false)
              }}
              onCancel={() => setVisibility(false)}
            >
              <Form layout="vertical" onSubmit={() => handleSubmit(props)}>
                <Form.Item label="Link">
                  {getFieldDecorator('link', {
                    rules: [{ required: true, message: 'Please enter link!' }],
                  })(<Input placeholder="Please enter link" size="large" />)}
                </Form.Item>
              </Form>
            </Modal>
          </Fragment>
        )
      }}
    </Mutation>
  )
}

export default withApollo(Form.create()(AddLinkModal))
