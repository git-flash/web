import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Dropdown, Icon, Avatar, Button } from 'antd'
import Router from 'next/router'
import Link from 'next/link'

import Logo from '../../../static/images/logo.svg'

const { Header } = Layout

class HeaderComponent extends Component {
  render() {
    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <div className="flex justify-between h-full px-4">
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
          </div>
          <div className="mx-4 flex">
            <div className="px-4">
              <Link href={`/authentication`} as={`/authentication`}>
                <Button type="dashed" icon="login">
                  Sign In
                </Button>
              </Link>
            </div>
            <div className="px-4">
              <Link href={`/authentication`} as={`/authentication`}>
                <Button type="primary" icon="thunderbolt">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Header>
    )
  }
}

export default HeaderComponent
