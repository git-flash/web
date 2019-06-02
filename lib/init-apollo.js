import { ApolloClient } from 'apollo-boost'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-unfetch'
import Cookies from 'js-cookie'

import LocalStore from './local-store'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

const httpApiUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:1337/graphql'
    : 'https://brainshrimp.herokuapp.com/graphql'

function create({ token, ...rest }) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  // Create an http link
  const httpLink = new HttpLink({
    uri: httpApiUrl, // Server URL (must be absolute)
    credentials: 'include', // Additional fetch() options like `credentials` or `headers`
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: httpLink,
    cache: new InMemoryCache().restore(rest || {}),
  })
}

export default function initApollo({ token, ...rest }) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create({ token, ...rest })
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create({ token, ...rest })
  }

  return apolloClient
}