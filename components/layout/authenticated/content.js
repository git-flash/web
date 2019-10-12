import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AuthenticatedLayoutContent extends Component {
  render() {
    return (
      <div style={{ height: 'calc(100vh - 65px)' }}>
        <div className="my-0 mx-auto">{this.props.children}</div>
      </div>
    )
  }
}

AuthenticatedLayoutContent.propTypes = {
  children: PropTypes.node,
}

export default AuthenticatedLayoutContent
