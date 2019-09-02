import React, { Fragment } from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'

import withApollo from '../../../lib/with-apollo'
import withLayout from '../../../lib/with-layout'
import Pages from '../../../components/sites/pages/base'

const PagesIndexPage = props => {
  return (
    <Fragment>
      <Head>
        <title>All Pages - Perfy</title>
      </Head>
      <Pages id={props.router.query.id} siteId={props.router.query.siteId} />
    </Fragment>
  )
}

export default withRouter(withApollo(withLayout(PagesIndexPage)))
