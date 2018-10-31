import NextDocument, {Head, Main, NextScript} from 'next/document'

import isProxyRequestFn from '../server/is-proxy-request'

interface Props {
  isProxyRequest: boolean,
  shopName: string,
}

export default class Document extends NextDocument<Props> {
  public static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx)
    const isProxyRequest = isProxyRequestFn(ctx.req)
    const shopName = ctx.query.shop
    return {...initialProps, isProxyRequest, shopName}
  }

  public render() {
    const Common = () => <>
      <Main />
      <NextScript />
      <script dangerouslySetInnerHTML={{__html: `shopName = "${this.props.shopName}";`}} />
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
