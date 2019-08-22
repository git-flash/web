import React, { Fragment, Component } from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'

import withApollo from '../../lib/with-apollo'
import withLayout from '../../lib/with-layout'
import Project from '../../components/projects/show'

class Show extends Component {
  render() {
    return (
      <Fragment>
        <Head>
          <title>Project Details - Perfy</title>
        </Head>
        <Project id={this.props.router.query.id} />
      </Fragment>
    )
  }
}

export default withRouter(withApollo(withLayout(Show)))
