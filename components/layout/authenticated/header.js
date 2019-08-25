import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Dropdown, Icon, Avatar } from 'antd'
import Router from 'next/router'
import Link from 'next/link'

import LocalStore from '../../../lib/local-store'

const { Header } = Layout

class AuthenticatedLayoutHeader extends Component {
  handleSignOut = () => {
    LocalStore.clear()

    Router.push('/authentication')
  }

  render() {
    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <div className="flex justify-between h-full px-4 border border-solid border-gray-300">
          <div />
          <div className="mx-4 flex">
            <div className="px-4">
              <Dropdown
                placement="bottomRight"
                overlay={
                  <Menu>
                    <Menu.Item>
                      <a
                        rel="noopener noreferrer"
                        href="javascript:"
                        onClick={this.handleSignOut}
                      >
                        Sign Out
                      </a>
                    </Menu.Item>
                  </Menu>
                }
              >
                <a className="ant-dropdown-link block h-16" href="#">
                  <Avatar icon="user" />
                </a>
              </Dropdown>
            </div>
          </div>
        </div>
      </Header>
    )
  }
}

export default AuthenticatedLayoutHeader
