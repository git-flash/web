import React, { Fragment } from 'react'
import Head from 'next/head'

import withApollo from '../../lib/with-apollo'
import withLayout from '../../lib/with-layout'
import Projects from '../../components/projects/base'

const Index = () => {
  return (
    <Fragment>
      <Head>
        <title>All Projects - Perfy</title>
      </Head>
      <Projects />
    </Fragment>
  )

}

export default withApollo(withLayout(Index))
