import React, { Component } from 'react'

import withApollo from '../../lib/with-apollo'
import withLayout from '../../lib/with-layout'
import SignIn from '../../components/auth/sign-in'

class AuthSignIn extends Component {
  render() {
    return <SignIn />
  }
}

export default withApollo(withLayout(AuthSignIn))
