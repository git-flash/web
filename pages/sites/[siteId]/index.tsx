import React, { Fragment } from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'

import withApollo from '../../../lib/with-apollo'
import withLayout from '../../../lib/with-layout'
import Site from '../../../components/sites/show'

const SitesShowPage = (props: any) => {
  return (
    <Fragment>
      <Head>
        <title>Site Details - Perfy</title>
      </Head>
      <Site {...props.router.query} />
    </Fragment>
  )
}

export default withRouter(withApollo(withLayout(SitesShowPage)))
