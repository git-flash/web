import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Dropdown, Icon, Avatar } from 'antd'
import Router from 'next/router'

import LocalStore from '../../lib/local-store'

const { Header } = Layout

class HeaderComponent extends Component {
  handleSingOut = () => {
    LocalStore.clear()

    Router.push('/auth/sign-in')
  }

  render() {
    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <div className="flex flex-row-reverse items-center h-full px-4 border border-solid border-gray-300">
          <div className="mx-4 my-10">
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
