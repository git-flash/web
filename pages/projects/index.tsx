import React, { Fragment, Component } from 'react'
import Head from 'next/head'

import withApollo from '../../lib/with-apollo'
import withLayout from '../../lib/with-layout'
import Projects from '../../components/projects/base'

class Index extends Component {
  render() {
    return (
      <Fragment>
        <Head>
          <title>All Projects - Perfy</title>
        </Head>
        <Projects />
      </Fragment>
    )
  }
}

export default withApollo(withLayout(Index))
