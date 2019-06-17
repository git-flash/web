import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Card } from 'antd'

import Illustration from '../../../static/images/authentication-illustration.png'

const { Content } = Layout

class ContentComponent extends Component {
  render() {
    return (
      <div className="min-h-screen bg-white pt-16">{this.props.children}</div>
    )
  }
}

ContentComponent.propTypes = {
  children: PropTypes.node,
}

export default ContentComponent
