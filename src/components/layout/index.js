import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import styled from 'styled-components'

import HeaderComponent from './header'
import SiderComponent from './sider'
import ContentComponent from './content'

const StyledGlobalLayout = styled(Layout)`
  min-height: 100vh;
`
const StyledContentLayout = styled(Layout)`
  flex-direction: row;
`

class LayoutComponent extends Component {
  render() {
    return (
      <StyledGlobalLayout>
        <HeaderComponent />
        <StyledContentLayout>
          <SiderComponent />
          <ContentComponent>{this.props.children}</ContentComponent>
        </StyledContentLayout>
      </StyledGlobalLayout>
    )
  }
}

LayoutComponent.propTypes = {
  children: PropTypes.node,
}

export default LayoutComponent
