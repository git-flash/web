import React, { Fragment, useState } from 'react'
import { useMutation } from 'react-apollo'
import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import gql from 'graphql-tag'
import { FormComponentProps } from 'antd/es/form'

interface AddPagesToSiteFormProps extends FormComponentProps {
  siteId: string
}

const CREATE_PAGE_MUTATION = gql`
  mutation($link: String, $site_id: uuid) {
    insert_page(objects: { link: $link, site_id: $site_id }) {
      returning {
        link
        id
      }
    }
  }
`

const AddPagesToSite = (props: any) => {
  const [visible, setVisibility] = useState(false)
  const { getFieldDecorator, validateFields, resetFields } = props.form
  const [createPageMutation] = useMutation(CREATE_PAGE_MUTATION)

  const handleSubmit = () => {
    validateFields(async (err: Error, values: any) => {
      if (!err) {
        await createPageMutation({
          variables: {
            link: values.link,
            site_id: props.siteId,
          },
        })

        resetFields()
      }
    })
  }

  return (
    <Fragment>
      <Button onClick={() => setVisibility(true)} size="large" icon="link">
        Add Pages
      </Button>
      <Modal
        title="Add a new page"
        centered
        visible={visible}
        onOk={() => {
          handleSubmit()
          setVisibility(false)
        }}
        onCancel={() => setVisibility(false)}
        okText="Add"
      >
        <Form layout="vertical" onSubmit={() => handleSubmit()}>
          <Form.Item label="Link">
            {getFieldDecorator('link', {
              rules: [{ required: true, message: 'Please enter link!' }],
            })(<Input placeholder="Please enter link" size="large" />)}
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  )
}

export default Form.create<AddPagesToSiteFormProps>()(AddPagesToSite)
