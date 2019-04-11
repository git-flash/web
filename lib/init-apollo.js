import { ApolloClient } from 'apollo-boost'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-unfetch'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

const httpApiUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:1337/graphql'
    : 'https://brainshrimp.herokuapp.com/graphql'

function create(initialState) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  // Create an http link
  const httpLink = new HttpLink({
    uri: httpApiUrl, // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2FmNDcwYWY2MmViMjExYzUwZWFjOWUiLCJpZCI6IjVjYWY0NzBhZjYyZWIyMTFjNTBlYWM5ZSIsImlhdCI6MTU1NDk5MDg1OCwiZXhwIjoxNTU3NTgyODU4fQ.LuE1Zx8Fn7jxfi7-AM7YdjZm9KPhcwJH38cQGwdhaLY',
    },
  })

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: httpLink,
    cache: new InMemoryCache().restore(initialState || {}),
  })
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
