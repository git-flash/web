import React, { Fragment } from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'

import withApollo from '../../../lib/with-apollo'
import withLayout from '../../../lib/with-layout'
import Site from '../../../components/sites/edit'

type Props = {
  router: { query: { siteId: string } }
}

const SitesEditPage = (props: Props) => {
  return (
    <Fragment>
      <Head>
        <title>Edit site - Perfy</title>
      </Head>
      <Site id={props.router.query.siteId} />
    </Fragment>
  )
}

export default withRouter(withApollo(withLayout(SitesEditPage)))
