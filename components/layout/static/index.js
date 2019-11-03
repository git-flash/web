import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Layout from 'antd/lib/layout'

import ContentComponent from './content'
import HeaderComponent from './header'

class StaticLayout extends Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh', flexDirection: 'row' }}>
        <Layout>
          <HeaderComponent />
          <ContentComponent>{this.props.children}</ContentComponent>
        </Layout>
      </Layout>
    )
  }
}

StaticLayout.propTypes = {
  children: PropTypes.node,
}

export default StaticLayout
