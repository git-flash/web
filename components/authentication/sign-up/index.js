import React, { useState } from 'react'

import { Form, Button, Input } from 'antd'
import Router from 'next/router'

const SignUp = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { getFieldDecorator } = props.form

  const handleSubmit = () => {
    props.form.validateFields(async (err, values) => {
      if (!err) {
        setIsLoading(true)

        try {
          const response = await fetch(`${process.env.AUTH_URL}/signup`, {
            method: 'post',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: values.email,
              password: values.password,
              confirmPassword: values.password,
              username: values.username,
            }),
          })

          const data = await response.json()

          document.cookie = `userId=${data.id};path=/`
          document.cookie = `email=${data.email};path=/`
          document.cookie = `token=${data.token};path=/`

          if ([200, 201].indexOf(response.status) > -1) {
            setError('')

            Router.push('/projects')
          } else {
            const data = await response.json()

            setError('Invalid credentials')

            setIsLoading(false)
          }
        } catch (error) {
          setError(error)
          setIsLoading(false)

          console.error(error)
        }
      }
    })
  }

  return (
    <div className="mt-4">
      <Form layout="vertical" onSubmit={handleSubmit}>
        <Form.Item label="Email">
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: 'Please enter email!',
              },
            ],
            initialValue: '',
          })(
            <Input placeholder="Please enter email" size="large" type="email" />
          )}
        </Form.Item>
        <Form.Item label="Username">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please enter username!' }],
            initialValue: '',
          })(
            <Input
              placeholder="Please enter username"
              size="large"
              type="username"
            />
          )}
        </Form.Item>
        <Form.Item label="Password">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please enter password!' }],
            initialValue: '',
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
