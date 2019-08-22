import React, { Fragment } from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'

import withApollo from '../../lib/with-apollo'
import withLayout from '../../lib/with-layout'
import Project from '../../components/projects/edit'

type Props = {
  router: { query: { id: string } }
}

const Edit = (props: Props) => {
  return (
    <Fragment>
      <Head>
        <title>Edit project - Perfy</title>
      </Head>
      <Project id={props.router.query.id} />
    </Fragment>
  )
}

export default withRouter(withApollo(withLayout(Edit)))
