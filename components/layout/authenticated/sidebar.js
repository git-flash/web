import React, { Component, useState } from 'react'
import { Layout, Menu, Icon } from 'antd'
import Link from 'next/link'
import Router from 'next/router'

import Logo from '../../../static/images/logo.svg'

const { Sider } = Layout

const AuthenticatedSidebar = () => {
  const [isSidebarCollapsed, collapseSidebar] = useState(false)

  return (
    <Sider
      width="250px"
      collapsible
      collapsed={isSidebarCollapsed}
      onCollapse={state => collapseSidebar(state)}
    >
      <div
        className="flex justify-center items-center"
        style={{ height: '62px' }}
      >
        <Link href={`/`} as={`/`}>
          <a>
            {isSidebarCollapsed ? (
              <img src={Logo} alt="Perfy" width="30px" height="40px" />
            ) : (
              <div>
                <img src={Logo} alt="Perfy" width="30px" className="mr-2" />
                <span className="font-bold uppercase">Perfy</span>
              </div>
            )}
          </a>
        </Link>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        onClick={({ item, key }) => Router.push(key)}
      >
        <Menu.Item key="/projects">
          <Icon type="unordered-list" />
          <span>Projects</span>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default AuthenticatedSidebar
