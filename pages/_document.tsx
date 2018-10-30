import NextDocument, {Head, Main, NextScript} from 'next/document'

import isProxyRequestFn from '../server/is-proxy-request'

interface Props {
  isProxyRequest: boolean,
}

export default class Document extends NextDocument<Props> {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx)
    const isProxyRequest = isProxyRequestFn(ctx.req)
    return {...initialProps, isProxyRequest}
  }

  public render() {
    const Common = () => <>
      <Main />
      <NextScript />
    </>

    if (this.props.isProxyRequest) { return <Common /> }

    return (
      <html>
        <Head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <body>
          <Common />
        </body>
      </html>
    )
  }
}
