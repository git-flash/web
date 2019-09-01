import React, { useState, useEffect } from 'react'
import { Layout } from 'antd'
import { Menu, Icon } from 'antd'
import Router from 'next/router'


const AuthenticatedSidebar = () => {
  const [isSidebarCollapsed, collapseSidebar] = useState(false)
  const { Sider } = Layout

  useEffect(() => {
    window.innerWidth < 1024 && collapseSidebar(true)
  });


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
          <Menu.Item key="/sites">
            <Icon type="project" />
            <span>Sites</span>
          </Menu.Item>
          <Menu.Item key="/users">
            <Icon type="user" />
            <span>Users</span>
          </Menu.Item>
          <Menu.Item key="/information">
            <Icon type="container" />
            <span>Information</span>
          </Menu.Item>
        </Menu>
      </div>
    </Sider >
  )
}

export default AuthenticatedSidebar
