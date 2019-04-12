import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Dropdown, Icon, Avatar } from 'antd'

const { Header } = Layout

class HeaderComponent extends Component {
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
                      target="_blank"
                      rel="noopener noreferrer"
                      href="http://www.alipay.com/"
                    >
                      1st menu item
                    </a>
                  </Menu.Item>
                  <Menu.Item>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="http://www.taobao.com/"
                    >
                      2nd menu item
                    </a>
                  </Menu.Item>
                  <Menu.Item>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="http://www.tmall.com/"
                    >
                      3rd menu item
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
