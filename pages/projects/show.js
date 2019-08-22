import React, { Fragment } from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'

import withApollo from '../../lib/with-apollo'
import withLayout from '../../lib/with-layout'
import Project from '../../components/projects/show'

const Show = props => {
  return (
    <Fragment>
      <Head>
        <title>Project Details - Perfy</title>
      </Head>
      <Project id={props.router.query.id} />
    </Fragment>
  )
}

export default withRouter(withApollo(withLayout(Show)))
