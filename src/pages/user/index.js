import React from 'react'

import withApollo from '../../lib/with-apollo'
import withLayout from '../../lib/with-layout'
import UserProfile from '../../components/user-profile'

class Index extends React.Component {
  render() {
    return <UserProfile />
  }
}

export default withApollo(withLayout(Index))
