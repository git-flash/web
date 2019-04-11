import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Icon, Menu, Row, Col } from 'antd'

const { Header } = Layout

class HeaderComponent extends Component {
  render() {
    return (
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        />
      </Header>
    )
  }
}

HeaderComponent.propTypes = {}

export default HeaderComponent
