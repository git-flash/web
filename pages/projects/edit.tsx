import { withRouter } from 'next/router'
import React, { Component } from 'react'

import withApollo from '../../lib/with-apollo'
import withLayout from '../../lib/with-layout'
import Project from '../../components/projects/edit'

type Props = {
  router: { query: { id: string } }
}

class Edit extends Component<Props> {
  render() {
    return <Project id={this.props.router.query.id} />
  }
}

export default withRouter(withApollo(withLayout(Edit)))
