import React, { Component } from 'react'
import nextCookie from 'next-cookies'

import 'antd/dist/antd.css'

import Layout from '../components/layout/authentication/layout'

export default App => {
  return class extends Component {
    static async getInitialProps(ctx) {
      let appProps = {}

      const { token } = nextCookie(ctx)

      if (token) {
        ctx.res.writeHead(302, {
          Location: `/projects?referrer=${ctx.res.req.originalUrl}`,
        })

        ctx.res.end()
      }

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
