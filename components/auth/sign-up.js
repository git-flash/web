import React, { Component, Fragment } from 'react'
import gql from 'graphql-tag'
import { graphql, withApollo, Query } from 'react-apollo'
import { Form, Button, Input } from 'antd'
import styled from 'styled-components'
import Router from 'next/router'
import Link from 'next/link'

import LocalStore from '../../lib/local-store'

class ProjectsShow extends Component {
  componentDidMount() {
    if (LocalStore.apiToken) {
      Router.push('/projects')
    }
  }

  handleSubmit = () => {
    this.props.form.validateFields(async (err, values) => {
      const { username, email, password } = values

      if (!err) {
        try {
          const req = await fetch('http://localhost:1337/auth/local/register', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify({
              username,
              email,
              password,
            }),
          })
          const res = await req.json()

          if (req.status === 200) {
            LocalStore.apiToken = res.jwt

            Router.push('/projects')
          } else {
            this.props.form.setFields({
              username: {
                value: username,
                errors: [new Error('You have entered a wrong username!')],
              },
              email: {
                value: email,
                errors: [new Error('You have entered a wrong email!')],
              },
              password: {
                value: password,
                errors: [new Error('You have entered a wrong password!')],
              },
            })
          }
        } catch (error) {
          console.error(error)
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div className="flex justify-center flex-col ml-auto mr-auto">
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <Form.Item label="Username">
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please enter username!' }],
            })(<Input placeholder="Please enter username" size="large" />)}
          </Form.Item>
          <Form.Item label="Email">
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please enter email!' }],
            })(<Input placeholder="Please enter email" size="large" />)}
          </Form.Item>
          <Form.Item label="Password">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please enter password!' }],
            })(<Input placeholder="Please enter password" size="large" />)}
          </Form.Item>
        </Form>
        <div className="flex justify-end">
          <div className="mr-4">
            <Link href={`/projects`} as={`/projects`}>
              <Button size="large" icon="close-circle">
                Cancel
              </Button>
            </Link>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            onClick={this.handleSubmit}
            size="large"
            icon="check-circle"
          >
            Update
          </Button>
        </div>
      </div>
    )
  }
}

export default withApollo(Form.create()(ProjectsShow))
