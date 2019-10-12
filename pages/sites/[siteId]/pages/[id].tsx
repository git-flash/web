import React, { Fragment } from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'

import withApollo from '../../../../lib/with-apollo'
import withLayout from '../../../../lib/with-layout'
import Pages from '../../../../components/sites/pages/show'

const PagesIndexPage = (props: any) => {
  return (
    <Fragment>
      <Head>
        <title>Page Details - Perfy</title>
      </Head>
      <Pages {...props.router.query} />
    </Fragment>
  )
}

export default withRouter(withApollo(withLayout(PagesIndexPage)))
