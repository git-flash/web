import React, { Fragment } from 'react'
import Head from 'next/head'

import withLayout from '../lib/with-static-layout'
import LandingPage from '../components/static/landing-page'

const Index = () => {
  return (
    <Fragment>
      <Head>
        <title>Perfy - A tool to help you optimize your application</title>
      </Head>
      <LandingPage />
    </Fragment>
  )
}

export default withLayout(Index)
