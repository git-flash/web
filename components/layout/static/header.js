import React, { Component, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Layout,
  Menu,
  Dropdown,
  Icon,
  Avatar,
  Button,
  Row,
  Col,
  Drawer,
} from 'antd'
import Link from 'next/link'

import Logo from '../../../static/images/logo.svg'

const StaticLayoutHeader = () => {
  const { Header } = Layout
  const [isDrawerVisible, setDrawerVisibility] = useState(false)

  const drawerNode = () => {
    return (
      <Drawer
        title={<div className="uppercase">Menu</div>}
        onClose={() => setDrawerVisibility(false)}
        visible={isDrawerVisible}
      >
        <div className="flex uppercase flex-col text-center">
          <div className="py-4">
            <Link href={`/pricing`} as={`/pricing`}>
              <a>Pricing</a>
            </Link>
          </div>
          <div className="py-4">
            <Link href={`/product`} as={`/product`}>
              <a>Product</a>
            </Link>
          </div>
          <div className="py-4">
            <Link href={`/features`} as={`/features`}>
              <a>Features</a>
            </Link>
          </div>
          <div className="py-4">
            <Link href={`/authentication`} as={`/authentication`}>
              <Button type="link" className="uppercase text-sm">
                Sign In
              </Button>
            </Link>
          </div>
          <div className="py-4">
            <Link href={`/authentication`} as={`/authentication`}>
              <Button
                type="primary"
                size="large"
                icon="login"
                className="uppercase text-sm font-semibold"
                block
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </Drawer>
    )
  }

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
      <div className="px-16 flex justify-between h-full max-w-6xl my-4 mx-auto">
        <Row type="flex" justify="space-between" className="w-full">
          <Col xs={2} sm={2} md={0}>
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
          </Col>
          <Col xs={0} sm={0} md={14}>
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
                <Link href={`/features`} as={`/features`}>
                  <a>Features</a>
                </Link>
              </div>
            </div>
          </Col>
          <Col xs={0} md={6}>
            <div className="flex justify-end">
              <div className="pr-4">
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
          </Col>
          <Col xs={1} sm={1} md={0}>
            <div className="flex justify-end">
              <div className="pr-4">
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
              <div>
                <Button type="link" onClick={() => setDrawerVisibility(true)}>
                  <Icon type="menu" className="text-xl" />
                </Button>
              </div>
            </div>
            {drawerNode()}
          </Col>
        </Row>
      </div>
    </Header>
  )
}

export default StaticLayoutHeader
