import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'

const { Content } = Layout

class AuthenticatedLayoutContent extends Component {
  render() {
    return (
      <div className="m-8">
        <div className="p-4 my-0 mx-auto">{this.props.children}</div>
      </div>
    )
  }
}

AuthenticatedLayoutContent.propTypes = {
  children: PropTypes.node,
}

export default AuthenticatedLayoutContent
