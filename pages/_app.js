import App from 'next/app'
import withNProgress from 'next-nprogress'

export default withNProgress(300, { showSpinner: false })(App)
