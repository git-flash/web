import { withRouter } from 'next/router'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import withApollo from '../../lib/with-apollo'
import withLayout from '../../lib/with-layout'
import ProjectNew from '../../components/projects/new'

class New extends Component {
  render() {
    return <ProjectNew adminId="4ca52a82-cf2f-4905-8f5d-004236c94525" />
  }
}

New.propTypes = {
  url: PropTypes.object,
}

export default withRouter(withApollo(withLayout(New)))
