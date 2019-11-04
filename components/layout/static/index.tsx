import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'antd/lib/layout'

import ContentComponent from './content'
import HeaderComponent from './header'

const StaticLayout = ({ children }: { children: any }) => {
  return (
    <Layout style={{ minHeight: '100vh', flexDirection: 'row' }}>
      <Layout>
        <HeaderComponent />
        <ContentComponent>{children}</ContentComponent>
      </Layout>
    </Layout>
  )
}

StaticLayout.propTypes = {
  children: PropTypes.node,
}

export default StaticLayout
