import React, { Component, useState } from 'react'
import { Form, Button, Input, Card } from 'antd'
import Router from 'next/router'

const SignIn = props => {
  const [isLoading, setIsLoading] = useState(false)
  const { getFieldDecorator } = props.form
  const handleSubmit = () => {
    props.form.validateFields(async (err, values) => {
      if (!err) {
        setIsLoading(true)

        try {
          const response = await fetch('http://localhost:1337/auth/local', {
            method: 'post',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              identifier: values.identifier,
              password: values.password,
            }),
          })
          const data = await response.json()

          document.cookie = `token=${data.jwt};path=/`
          document.cookie = `email=${data.user.email};path=/`
          document.cookie = `identifier=${data.user.username};path=/`
          document.cookie = `roleName=${data.user.role.name};path=/`

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
          {getFieldDecorator('identifier', {
            rules: [
              {
                required: true,
                message: 'Please enter identifier!',
              },
            ],
            initialValue: 'ghoshnirmalya',
          })(
            <Input
              placeholder="Please enter identifier"
              size="large"
              type="identifier"
            />
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
          Sign In
        </Button>
      </div>
    </div>
  )
}

export default Form.create()(SignIn)
