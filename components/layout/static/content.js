import React, { Component } from 'react'
import PropTypes from 'prop-types'

class StaticLayoutContent extends Component {
  render() {
    return (
      <div className="min-h-screen bg-white pt-16">{this.props.children}</div>
    )
  }
}

StaticLayoutContent.propTypes = {
  children: PropTypes.node,
}

export default StaticLayoutContent
