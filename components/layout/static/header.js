import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Dropdown, Icon, Avatar, Button } from 'antd'
import Link from 'next/link'

import Logo from '../../../static/images/logo.svg'

const { Header } = Layout

class HeaderComponent extends Component {
  render() {
    return (
      <Header
        style={{
          background: '#fff',
          padding: '0',
          height: '100px',
          zIndex: '1',
          boxShadow: '0 10px 40px 0 #f7fafc',
        }}
      >
        <div className="px-4 flex justify-between h-full max-w-6xl my-4 mx-auto">
          <div className="flex uppercase text-sm">
            <div className="pr-4">
              <Link href={`/`} as={`/`}>
                <a>
                  <img
                    src={Logo}
                    className="pr-2"
                    alt="Perfy"
                    width="40px"
                    height="40px"
                  />
                </a>
              </Link>
            </div>
            <div className="px-4">
              <Link href={`/pricing`} as={`/pricing`}>
                <a>Pricing</a>
              </Link>
            </div>
            <div className="px-4">
              <Link href={`/product`} as={`/product`}>
                <a>Product</a>
              </Link>
            </div>
            <div className="px-4">
              <Link href={`/features`} as={`/authentication`}>
                <a>Features</a>
              </Link>
            </div>
          </div>
          <div className="ml-4 flex">
            <div className="px-4">
              <Link href={`/authentication`} as={`/authentication`}>
                <Button type="link" className="uppercase text-sm">
                  Sign In
                </Button>
              </Link>
            </div>
            <div>
              <Link href={`/authentication`} as={`/authentication`}>
                <Button
                  type="primary"
                  size="large"
                  icon="login"
                  className="w-40 uppercase text-sm font-semibold"
                >
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
