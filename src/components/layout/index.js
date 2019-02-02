import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import styled from 'styled-components'

import HeaderComponent from './header'
import SiderComponent from './sider'
import ContentComponent from './content'

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`
class LayoutComponent extends Component {
  render() {
    return (
      <StyledLayout>
        <HeaderComponent />
        <Layout>
          <SiderComponent />
          <ContentComponent>{this.props.children}</ContentComponent>
        </Layout>
      </StyledLayout>
    )
  }
}

LayoutComponent.propTypes = {
  children: PropTypes.node,
}

export default LayoutComponent
