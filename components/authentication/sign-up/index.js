import React, { Component, useState } from 'react'

import { Form, Button, Input, Card } from 'antd'
import Router from 'next/router'

const SignUp = props => {
  const [isLoading, setIsLoading] = useState(false)
  const { getFieldDecorator } = props.form
  const handleSubmit = () => {
    props.form.validateFields(async (err, values) => {
      if (!err) {
        setIsLoading(true)

        try {
          const response = await fetch(
            'http://localhost:1337/auth/local/register',
            {
              method: 'post',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: values.username,
                email: values.email,
                password: values.password,
              }),
            }
          )
          const data = await response.json()

          document.cookie = `token=${data.jwt};path=/`
          document.cookie = `email=${data.user.email};path=/`
          document.cookie = `username=${data.user.username};path=/`

          Router.push('/projects')

          setIsLoading(false)

          window.location.reload()
        } catch (error) {
          setIsLoading(false)

          console.error(error)
        }
      }
    })
  }

  return (
    <div className="mt-4">
      <Form layout="vertical" onSubmit={handleSubmit}>
        <Form.Item label="Username">
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Please enter username!',
              },
            ],
            initialValue: 'admin@admin.com',
          })(
            <Input
              placeholder="Please enter username"
              size="large"
              type="username"
            />
          )}
        </Form.Item>
        <Form.Item label="Email">
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: 'Please enter email!',
              },
            ],
            initialValue: 'admin@admin.com',
          })(
            <Input placeholder="Please enter email" size="large" type="email" />
          )}
        </Form.Item>
        <Form.Item label="Password">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please enter password!' }],
            initialValue: 'password',
          })(
            <Input
              placeholder="Please enter password"
              size="large"
              type="password"
            />
          )}
        </Form.Item>
      </Form>
      <div className="flex justify-end mt-12">
        <Button
          type="primary"
          htmlType="submit"
          onClick={handleSubmit}
          size="large"
          icon="check-circle"
          block
          loading={isLoading}
        >
          Sign Up
        </Button>
      </div>
    </div>
  )
}

export default Form.create()(SignUp)
