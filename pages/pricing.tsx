import React, { Fragment } from 'react'
import Head from 'next/head'

import withLayout from '../lib/with-static-layout'

const Pricing = () => {
  return (
    <Fragment>
      <Head>
        <title>Pricing | Perfy</title>
      </Head>
    </Fragment>
  )
}

export default withLayout(Pricing)
