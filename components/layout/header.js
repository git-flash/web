import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Dropdown, Icon, Avatar } from 'antd'
import Router from 'next/router'
import Link from 'next/link'

import LocalStore from '../../lib/local-store'
import Logo from '../../static/images/logo.png'

const { Header } = Layout

class HeaderComponent extends Component {
  handleSingOut = () => {
    LocalStore.clear()

    Router.push('/authentication')
  }

  render() {
    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <div className="flex justify-between h-full px-4 border border-solid border-gray-300">
          <div className="mx-4 flex">
            <div className="px-4">
              <Link href={`/dashboard`} as={`/dashboard`}>
                <a>
                  <img
                    src={Logo}
                    className="p-2"
                    alt="Perfy"
                    width="60px"
                    height="60px"
                  />
                </a>
              </Link>
            </div>
            <div className="px-4">
              <Link href={`/projects`} as={`/projects`}>
                <a>Projects</a>
              </Link>
            </div>
          </div>
          <div className="mx-4">
            <Dropdown
              placement="bottomRight"
              overlay={
                <Menu>
                  <Menu.Item>
                    <a
                      rel="noopener noreferrer"
                      href="javascript:"
                      onClick={this.handleSingOut}
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
      </Header>
    )
  }
}

HeaderComponent.propTypes = {
  children: PropTypes.node,
}

export default HeaderComponent
