import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import styled from 'styled-components'

const { Content } = Layout
const StyledContent = styled(Content)`
  margin: 24px auto;
  padding: 24px;
  max-width: 1000px;
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
