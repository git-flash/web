import React, { Fragment } from 'react'
import Head from 'next/head'

import withLayout from '../lib/with-static-layout'

const Features = () => {
  return (
    <Fragment>
      <Head>
        <title>Features | Perfy</title>
      </Head>
    </Fragment>
  )
}

export default withLayout(Features)
