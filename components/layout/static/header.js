import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Dropdown, Icon, Avatar, Button } from 'antd'
import Link from 'next/link'

import Logo from '../../../static/images/logo.svg'

const { Header } = Layout

class HeaderComponent extends Component {
  render() {
    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <div className="px-16 flex justify-between h-full max-w-6xl my-0 mx-auto">
          <div className="flex">
            <div className="pr-4">
              <Link href={`/dashboard`} as={`/dashboard`}>
                <a>
                  <img
                    src={Logo}
                    className="pr-2"
                    alt="Perfy"
                    width="60px"
                    height="60px"
                  />
                </a>
              </Link>
            </div>
            <div className="px-4 text-black font-bold">
              <Link href={`/pricing`} as={`/pricing`}>
                Pricing
              </Link>
            </div>
            <div className="px-4 text-black font-bold">
              <Link href={`/product`} as={`/product`}>
                Product
              </Link>
            </div>
            <div className="px-4 text-black font-bold">
              <Link href={`/features`} as={`/authentication`}>
                Features
              </Link>
            </div>
          </div>
          <div className="ml-4 flex">
            <div className="px-4">
              <Link href={`/authentication`} as={`/authentication`}>
                <Button type="secondary" size="large">
                  Sign In
                </Button>
              </Link>
            </div>
            <div className="pl-4">
              <Link href={`/authentication`} as={`/authentication`}>
                <Button type="primary" size="large">
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
