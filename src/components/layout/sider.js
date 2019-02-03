import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Icon } from 'antd'
import styled from 'styled-components'

const { Sider } = Layout
const SubMenu = Menu.SubMenu
const StyledSider = styled(Sider)`
  background: #fff;
  border-right: 1px solid #e8e8e8;
`
const StyledMenu = styled(Menu)`
  margin: 24px 0;
  border: 0;
`
const StyledMenuItem = styled(Menu.Item)`
  width: auto !important;
  margin: 24px;
`

class SiderComponent extends Component {
  render() {
    return (
      <StyledSider width={250}>
        <StyledMenu theme="light" defaultSelectedKeys={['1']} mode="inline">
          <StyledMenuItem key="dashboard">
            <Icon type="bar-chart" />
            <span>Dashboard</span>
          </StyledMenuItem>
          <StyledMenuItem key="projects">
            <Icon type="project" />
            <span>Projects</span>
          </StyledMenuItem>
          <StyledMenuItem key="users">
            <Icon type="team" />
            <span>Users</span>
          </StyledMenuItem>
        </StyledMenu>
      </StyledSider>
    )
  }
}

SiderComponent.propTypes = {}

export default SiderComponent
