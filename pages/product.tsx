import React, { Fragment } from 'react'
import Head from 'next/head'

import withLayout from '../lib/with-static-layout'

const Product = () => {
  return (
    <Fragment>
      <Head>
        <title>Product - Perfy</title>
      </Head>
    </Fragment>
  )
}

export default withLayout(Product)
