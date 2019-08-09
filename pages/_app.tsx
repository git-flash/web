import App from 'next/app'
import * as Sentry from '@sentry/browser'

import '../static/styles/tailwind.css'
import '../static/styles/ant.css'

class Perfy extends App {
  constructor(args: any) {
    super(args)

    if (process.env.NODE_ENV === 'production') {
      Sentry.init({ dsn: process.env.SENTRY_PUBLIC_DSN })
    }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    if (process.env.NODE_ENV === 'production') {
      Sentry.configureScope((scope: any) => {
        Object.keys(errorInfo).forEach(key => {
          scope.setExtra(key, errorInfo[key])
        })
      })
      Sentry.captureException(error)
    }
  }
}

export default Perfy
