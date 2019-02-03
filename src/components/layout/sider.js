import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Icon, Avatar } from 'antd'
import styled from 'styled-components'

const { Sider } = Layout
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const StyledMenu = styled(Menu)`
  border: 0;
`
const StyledSider = styled(Sider)`
  background: #fff;
  border-right: 1px solid #e8e8e8;
`
const StyledMenuItemGroup = styled(MenuItemGroup)`
  > .ant-menu-item-group-title {
    padding-left: 48px !important;
    font-size: 12px;
    font-weight: 500;
    color: #ccc;
    margin-top: 36px;
  }
`
const StyledMenuItem = styled(Menu.Item)`
  padding: 0 48px !important;
`
const StyledAvatar = styled(Avatar)`
  margin-right: 12px;
`

class SiderComponent extends Component {
  render() {
    return (
      <StyledSider width={250}>
        <StyledMenu theme="light" defaultSelectedKeys={['1']} mode="inline">
          <StyledMenuItemGroup key="menu" title="MENU">
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
          </StyledMenuItemGroup>
          <StyledMenuItemGroup key="your-projects" title="YOUR PROJECTS">
            <StyledMenuItem key="ju">
              <StyledAvatar
                size="small"
                shape="square"
                style={{
                  color: '#e6f7ff',
                  backgroundColor: '#1890ff',
                }}
              >
                JU
              </StyledAvatar>
              Join us for...
            </StyledMenuItem>
            <StyledMenuItem key="st">
              <StyledAvatar
                size="small"
                shape="square"
                style={{
                  color: '#e6f7ff',
                  backgroundColor: '#1890ff',
                }}
              >
                ST
              </StyledAvatar>
              Subscribe to...
            </StyledMenuItem>
          </StyledMenuItemGroup>
          <StyledMenuItemGroup key="team-members" title="TEAM MEMBERS">
            <StyledMenuItem key="ja">
              <StyledAvatar
                size="small"
                style={{
                  color: '#e6f7ff',
                  backgroundColor: '#1890ff',
                }}
              >
                JA
              </StyledAvatar>
              John Appleseed
            </StyledMenuItem>
            <StyledMenuItem key="jd">
              <StyledAvatar
                size="small"
                style={{
                  color: '#e6f7ff',
                  backgroundColor: '#1890ff',
                }}
              >
                JD
              </StyledAvatar>
              Jane Doe
            </StyledMenuItem>
          </StyledMenuItemGroup>
        </StyledMenu>
      </StyledSider>
    )
  }
}

SiderComponent.propTypes = {}

export default SiderComponent
