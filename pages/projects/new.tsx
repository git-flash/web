import React, { Fragment } from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'

import withApollo from '../../lib/with-apollo'
import withLayout from '../../lib/with-layout'
import ProjectNew from '../../components/projects/new'

const New = (props: any) => {
  return (
    <Fragment>
      <Head>
        <title>New project - Perfy</title>
      </Head>
      <ProjectNew {...props} />
    </Fragment>
  )
}

export default withRouter(withApollo(withLayout(New)))
