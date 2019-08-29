import React, { Fragment } from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'

import withApollo from '../../lib/with-apollo'
import withLayout from '../../lib/with-layout'
import Site from '../../components/sites/new'

const SitesNewPage = (props: any) => {
  return (
    <Fragment>
      <Head>
        <title>New site - Perfy</title>
      </Head>
      <Site {...props} />
    </Fragment>
  )
}

export default withRouter(withApollo(withLayout(SitesNewPage)))
