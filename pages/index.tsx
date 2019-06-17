import React, { Component } from 'react'

import withLayout from '../lib/with-static-layout'
import LandingPage from '../components/static/landing-page'

class Index extends Component {
  render() {
    return <LandingPage />
  }
}

export default withLayout(Index)
