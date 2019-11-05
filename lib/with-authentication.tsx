import React, { Component } from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'

export const auth = (ctx: any) => {
  const { token } = nextCookie(ctx)

  if (ctx.req && !token) {
    ctx.res.writeHead(302, {
      Location: `/authentication`,
    })

    ctx.res.end()

    return false
  }

  if (!token) {
    Router.push(`/authentication`)
  }

  return token
}

const getDisplayName = (Component: any) =>
  Component.displayName || Component.name || 'Component'

export const withAuthentication = (WrappedComponent: any) =>
  class extends Component {
    static displayName = `withAuthentication(${getDisplayName(
      WrappedComponent
    )})`

    static async getInitialProps(ctx: any) {
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx))

      return { ...componentProps }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
