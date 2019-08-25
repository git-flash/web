import React, { Component } from 'react'
import nextCookie from 'next-cookies'

import Layout from '../components/layout/authenticated'

export default App => {
  return class extends Component {
    static async getInitialProps(ctx) {
      let appProps = {}

      const { token, userId } = nextCookie(ctx)

      if (!token) {
        ctx.res.writeHead(302, {
          Location: `/authentication`,
        })

        ctx.res.end()
      }

      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(ctx)
      }

      return { ...appProps, userId }
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
