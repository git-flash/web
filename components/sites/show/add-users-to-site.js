import React, { useState } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { withApollo, useMutation, useSubscription } from 'react-apollo'
import { Button, Modal, Form, Card, Input, Select } from 'antd'
import Link from 'next/link'
import Gravatar from 'react-gravatar'
import includes from 'lodash/includes'

const fetchUsersSubscription = gql`
  subscription {
    user {
      id
      email
    }
  }
`

const insertSiteUserMutation = gql`
  mutation($user_id: uuid!, $site_id: uuid!) {
    insert_site_user(objects: { user_id: $user_id, site_id: $site_id }) {
      returning {
        id
      }
    }
  }
`

const AddUsersToSiteModal = props => {
  const [visible, setVisibility] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState([])
  const { getFieldDecorator } = props.form
  const { Option } = Select

  const { data, loading, error } = useSubscription(fetchUsersSubscription, {
    fetchPolicy: 'network-only',
  })

  if (error) return <p>Error: {error.message}</p>

  const handleSubmit = () => {
    props.form.validateFields((err, values) => {
      if (!err) {
        selectedUsers.map(async (id, index) => {
          const res = await props.client.mutate({
            mutation: insertSiteUserMutation,
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
    const siteUserIds = props.siteUsers.map(siteUser => siteUser.user.id)

    const usersWhoDoesntBelongToThisSite = data.user.filter(
      user => !siteUserIds.includes(user.id)
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
      >
        <Form layout="vertical" onSubmit={() => handleSubmit(props)}>
          <Form.Item label="Users">
            {getFieldDecorator('users', {
              rules: [{ required: true, message: 'Please enter users!' }],
            })(
              <Select
                onChange={users => setSelectedUsers(users)}
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select the users"
                maxTagCount={1}
                size="large"
                allowClear
              >
                {usersWhoDoesntBelongToThisSite.map(user => {
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

export default withApollo(Form.create()(AddUsersToSiteModal))
