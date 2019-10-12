import { Fragment } from 'react'
import Head from 'next/head'
import withLayout from '../lib/with-authentication-layout'

export default withLayout(() => {
  return (
    <Fragment>
      <Head>
        <title>Authentication - Perfy</title>
      </Head>
    </Fragment>
  )
})
