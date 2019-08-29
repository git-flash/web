import React, { Fragment } from 'react'
import Head from 'next/head'

import withApollo from '../../lib/with-apollo'
import withLayout from '../../lib/with-layout'
import Sites from '../../components/sites/base'

const SitesIndexPage = () => {
  return (
    <Fragment>
      <Head>
        <title>All Sites - Perfy</title>
      </Head>
      <Sites />
    </Fragment>
  )

}

export default withApollo(withLayout(SitesIndexPage))
