import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import styled from 'styled-components'

const { Content } = Layout
const StyledContent = styled(Content)`
  padding: 0 48px;
`

class ContentComponent extends Component {
  render() {
    return <StyledContent>{this.props.children}</StyledContent>
  }
}

ContentComponent.propTypes = {
  children: PropTypes.node,
}

export default ContentComponent
