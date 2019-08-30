import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Dropdown, Icon, Avatar } from 'antd'
import Router from 'next/router'
import Link from 'next/link'
import Gravatar from 'react-gravatar'

import Logo from '../../../static/images/logo.svg'

const { Header } = Layout

const AuthenticatedLayoutHeader = ({ email }) => {
  const handleSignOut = () => {
    document.cookie = `userId=`
    document.cookie = `email=`
    document.cookie = `token=`

    Router.push('/authentication')
  }

  return (
    <Header style={{ background: '#fff', padding: 0 }}>
      <div className="flex justify-between h-full border border-solid border-gray-300">
        <div className="mx-4 flex">
          <Link href={`/`} as={`/`}>
            <a>
              <img
                src={Logo}
                className="px-2"
                alt="Perfy"
                width="40px"
                height="40px"
              />
            </a>
          </Link>
        </div>
        <div className="mx-4 flex">
          <div className="px-4">
            <Icon type="notification" />
          </div>
          <div className="px-4">
            <Icon type="setting" />
          </div>
          <div className="px-4">
            <Dropdown
              placement="bottomRight"
              overlay={
                <Menu>
                  <Menu.Item>
                    <a
                      rel="noopener noreferrer"
                      href="javascript:"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </a>
                  </Menu.Item>
                </Menu>
              }
            >
              <a className="ant-dropdown-link block h-16" href="#">
                <Gravatar email={email} size={30} className="rounded-full" />
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
    </Header>
  )
}

AuthenticatedLayoutHeader.propTypes = {
  email: PropTypes.string,
}

export default AuthenticatedLayoutHeader
