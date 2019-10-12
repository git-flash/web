import React, { Component } from 'react'

import Layout from '../components/layout/static'

export default App => {
  return class extends Component {
    static async getInitialProps(ctx) {
      let appProps = {}

      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(ctx)
      }

      return { ...appProps }
    }

    render() {
      return (
        <Layout>
          <App {...this.props} />
        </Layout>
      )
    }
  }
}
