import React, { Fragment, useState } from 'react'
import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import gql from 'graphql-tag'
import { graphql, withApollo, Mutation } from 'react-apollo'
import Link from 'next/link'

const createPageMutation = gql`
  mutation($link: String, $site_id: uuid) {
    insert_page(objects: { link: $link, site_id: $site_id }) {
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
        mutation: createPageMutation,
        variables: {
          link: values.link,
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
              okText="Add"
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

export default withApollo(Form.create()(AddPagesToSite))
