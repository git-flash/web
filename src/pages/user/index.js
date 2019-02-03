import React, { Component } from 'react'

import withApollo from '../../lib/with-apollo'
import withLayout from '../../lib/with-layout'
import UserProfile from '../../components/user-profile'

class Index extends Component {
  render() {
    return <UserProfile />
  }
}

export default withApollo(withLayout(Index))
