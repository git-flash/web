import React, { useState } from 'react'
import { Layout } from 'antd'
import { Menu, Icon } from 'antd'
import Router from 'next/router'


const AuthenticatedSidebar = () => {
  const [isSidebarCollapsed, collapseSidebar] = useState(false)
  const { Sider } = Layout

  return (
    <Sider
      width="250px"
      collapsible
      collapsed={isSidebarCollapsed}
      onCollapse={state => collapseSidebar(state)}
    >
      <div className="mt-4">
        <Menu
          theme="dark"
          mode="inline"
          onClick={({ key }) => Router.push(key)}
        >
          <Menu.Item key="/dashboard">
            <Icon type="appstore" />
            <span>Dashboard</span>
          </Menu.Item>
          <Menu.Item key="/users">
            <Icon type="user" />
            <span>Users</span>
          </Menu.Item>
          <Menu.Item key="/information">
            <Icon type="container" />
            <span>Information</span>
          </Menu.Item>
          <Menu.Item key="/projects">
            <Icon type="project" />
            <span>Projects</span>
          </Menu.Item>
        </Menu>
      </div>
    </Sider >
  )
}

export default AuthenticatedSidebar
