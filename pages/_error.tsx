import React, { Fragment } from 'react'
import Head from 'next/head'

import withLayout from '../lib/with-layout'
import Error from '../components/error'

const ErrorPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Error page - Perfy</title>
      </Head>
      <Error />
    </Fragment>
  )

}

export default withLayout(ErrorPage)
