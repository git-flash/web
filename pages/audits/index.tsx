import React, { Fragment } from 'react'
import Head from 'next/head'

import withApollo from '../../lib/with-apollo'
import withLayout from '../../lib/with-layout'
import Audits from '../../components/audits/base'

const AuditsIndexPage = () => {
  return (
    <Fragment>
      <Head>
        <title>All Audits - Perfy</title>
      </Head>
      <Audits />
    </Fragment>
  )
}

export default withApollo(withLayout(AuditsIndexPage))
