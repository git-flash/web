import React, { Fragment } from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'

import withApollo from '../../../../../../../lib/with-apollo'
import withLayout from '../../../../../../../lib/with-layout'
import Audit from '../../../../../../../components/sites/pages/audits/show'

const AuditsShowPage = (props: any) => {
  return (
    <Fragment>
      <Head>
        <title>Audit Details - Perfy</title>
      </Head>
      <Audit {...props.router.query} />
    </Fragment>
  )
}

export default withRouter(withApollo(withLayout(AuditsShowPage)))
