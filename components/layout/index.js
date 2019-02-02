import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Layout extends Component {
  render() {
    return <div>{this.props.children}</div>
  }
}

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout
