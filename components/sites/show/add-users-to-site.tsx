import React, { useState } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { useSubscription } from 'react-apollo'
import Button from 'antd/lib/button'
import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form'
import Select from 'antd/lib/select'
import Gravatar from 'react-gravatar'

import { FormComponentProps } from 'antd/es/form'

interface AddUsersToSiteModalFormProps extends FormComponentProps {
  siteId: string
}

const FETCH_USERS_SUBSCRIPTION = gql`
  subscription {
    user {
      id
      email
    }
  }
`

const INSERT_SITE_USER_MUTATION = gql`
  mutation($user_id: uuid!, $site_id: uuid!) {
    insert_site_user(objects: { user_id: $user_id, site_id: $site_id }) {
      returning {
        id
      }
    }
  }
`

const AddUsersToSiteModal = (props: any) => {
  const [visible, setVisibility] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState([])
  const { getFieldDecorator } = props.form
  const { Option } = Select

  const { data, loading, error } = useSubscription(FETCH_USERS_SUBSCRIPTION, {
    fetchPolicy: 'network-only',
  })

  if (error) return <p>Error: {error.message}</p>

  const handleSubmit = () => {
    props.form.validateFields((err: Error) => {
      if (!err) {
        selectedUsers.map(async id => {
          await props.client.mutate({
            mutation: INSERT_SITE_USER_MUTATION,
            variables: {
              user_id: id,
              site_id: props.siteId,
            },
          })
        })

        setVisibility(false)
      }
    })
  }

  const modalNode = () => {
    const siteUserIds = props.siteUsers.map((siteUser: any) => siteUser.user.id)

    const usersWhoDoesntBelongToThisSite = data.user.filter(
      (user: any) => !siteUserIds.includes(user.id)
    )

    return (
      <Modal
        title={`Add Users To ${props.siteName}`}
        onOk={handleSubmit}
        onCancel={() => {
          handleSubmit()
          setVisibility(false)
        }}
        destroyOnClose
        visible={visible}
        centered
        okText="Add"
      >
        <Form layout="vertical" onSubmit={() => handleSubmit()}>
          <Form.Item label="Users">
            {getFieldDecorator('users', {
              rules: [{ required: true, message: 'Please enter users!' }],
            })(
              <Select
                onChange={(users: any) => setSelectedUsers(users)}
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select the users"
                maxTagCount={1}
                size="large"
                allowClear
              >
                {usersWhoDoesntBelongToThisSite.map((user: any) => {
                  return (
                    <Option key={user.id} value={user.id}>
                      <Gravatar
                        email={user.email}
                        size={20}
                        className="rounded-full mr-4"
                      />
                      {user.email}
                    </Option>
                  )
                })}
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }

  return (
    <>
      <Button
        onClick={() => setVisibility(true)}
        size="large"
        icon="usergroup-add"
      >
        Add Users
      </Button>
      {!loading && modalNode()}
    </>
  )
}

AddUsersToSiteModal.propTypes = {
  siteId: PropTypes.string.isRequired,
  siteName: PropTypes.string.isRequired,
  siteUsers: PropTypes.array.isRequired,
}

export default Form.create<AddUsersToSiteModalFormProps>()(AddUsersToSiteModal)
