import React, { Fragment, Component } from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'

import withApollo from '../../lib/with-apollo'
import withLayout from '../../lib/with-layout'
import ProjectNew from '../../components/projects/new'

class New extends Component {
  render() {
    return (
      <Fragment>
        <Head>
          <title>New project - Perfy</title>
        </Head>
        <ProjectNew {...this.props} />
      </Fragment>
    )
  }
}

export default withRouter(withApollo(withLayout(New)))
