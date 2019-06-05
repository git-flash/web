import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

type Props = {
  styleTags: []
}

export default class MyDocument extends Document<Props> {
  static getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet()
    const page = ctx.renderPage((App: any) => (props: any) =>
      sheet.collectStyles(<App {...props} />)
    )
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html>
        <Head>
          {this.props.styleTags}
          <link
            href="https://fonts.googleapis.com/css?family=Lato"
            rel="stylesheet"
          />
        </Head>
        <body className="bg-gray-100">
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
