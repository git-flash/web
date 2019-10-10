import React, { Fragment } from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'

import withApollo from '../../../lib/with-apollo'
import withLayout from '../../../lib/with-layout'
import Site from '../../../components/sites/show'

const SitesShowPage = props => {
  return (
    <Fragment>
      <Head>
        <title>Site Details - Perfy</title>
      </Head>
      <Site id={props.router.query.siteId} />
    </Fragment>
  )
}

export default withRouter(withApollo(withLayout(SitesShowPage)))
