import React, { Fragment } from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'

import withApollo from '../../../lib/with-apollo'
import withLayout from '../../../lib/with-layout'
import Links from '../../../components/sites/links/base'

const LinksIndexPage = props => {
  return (
    <Fragment>
      <Head>
        <title>All Links - Perfy</title>
      </Head>
      <Links id={props.router.query.id} siteId={props.router.query.siteId} />
    </Fragment>
  )
}

export default withRouter(withApollo(withLayout(LinksIndexPage)))
