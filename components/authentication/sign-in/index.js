import React, { Component } from 'react'
import { Form, Button, Input, Card } from 'antd'
import Router from 'next/router'

class SignIn extends Component {
  handleSubmit = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
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
        } catch (error) {
          console.error(error)
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div className="w-1/3">
        <Card>
          <Form layout="vertical" onSubmit={this.handleSubmit}>
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
          <div className="flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              onClick={this.handleSubmit}
              size="large"
              icon="check-circle"
            >
              Sign In
            </Button>
          </div>
        </Card>
      </div>
    )
  }
}

export default Form.create()(SignIn)
