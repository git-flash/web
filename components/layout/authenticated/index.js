import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'

import ContentComponent from './content'
import HeaderComponent from './header'
import SidebarComponent from './sidebar'
import { withAuthentication } from '../../../lib/with-authentication'

const AuthenticatedLayout = ({ email, children }) => {
  return (
    <Layout>
      <HeaderComponent email={email} />
      <Layout
        style={{
          flexDirection: 'row',
        }}
      >
        <SidebarComponent />
        <Layout>
          <ContentComponent>{children}</ContentComponent>
        </Layout>
      </Layout>
    </Layout>
  )
}

AuthenticatedLayout.propTypes = {
  children: PropTypes.node,
  email: PropTypes.string,
}

export default withAuthentication(AuthenticatedLayout)
