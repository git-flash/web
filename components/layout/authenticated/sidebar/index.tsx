import React, { useState, useEffect } from 'react'
import { Layout } from 'antd'
import { Menu, Icon } from 'antd'
import { withRouter } from 'next/router'

const AuthenticatedSidebar = (props: any) => {
  const [isSidebarCollapsed, collapseSidebar] = useState(false)
  const { Sider } = Layout

  useEffect(() => {
    window.innerWidth < 1024 && collapseSidebar(true)
  })

  const getClassName = (key: string) => {
    if (props.router.asPath === key) {
      return 'ant-menu-item-selected'
    }

    return ''
  }

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
          onClick={({ key }) => props.router.push(key)}
        >
          <Menu.Item key="/dashboard" className={getClassName('/dashboard')}>
            <Icon type="appstore" />
            <span className="font-bold">Dashboard</span>
          </Menu.Item>
          <Menu.Item key="/sites" className={getClassName('/sites')}>
            <Icon type="project" />
            <span className="font-bold">Sites</span>
          </Menu.Item>
          <Menu.Item key="/users" className={getClassName('/users')}>
            <Icon type="user" />
            <span className="font-bold">Users</span>
          </Menu.Item>
          <Menu.Item key="/teams" className={getClassName('/teams')}>
            <Icon type="team" />
            <span className="font-bold">Teams</span>
          </Menu.Item>
          <Menu.Item
            key="/information"
            className={getClassName('/information')}
          >
            <Icon type="info-circle" />
            <span className="font-bold">Information</span>
          </Menu.Item>
          <Menu.Item key="/audits" className={getClassName('/audits')}>
            <Icon type="audit" />
            <span className="font-bold">Audits</span>
          </Menu.Item>
        </Menu>
      </div>
    </Sider>
  )
}

export default withRouter(AuthenticatedSidebar)
