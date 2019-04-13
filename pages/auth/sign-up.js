import React, { Component } from 'react'

import withApollo from '../../lib/with-apollo'
import withLayout from '../../lib/with-layout'
import SignUp from '../../components/auth/sign-up'

class AuthSignUp extends Component {
  render() {
    return <SignUp />
  }
}

export default withApollo(withLayout(AuthSignUp))
