import React, { useState } from 'react'
import { Layout } from 'antd'

import ProjectsMenu from "./projects-menu"

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
        <ProjectsMenu />
      </div>
    </Sider>
  )
}

export default AuthenticatedSidebar
