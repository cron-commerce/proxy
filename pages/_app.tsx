import NextApp, {Container} from 'next/app'
import {ApolloProvider} from 'react-apollo'

import withApollo, {AppProps} from '../lib/with-apollo'

export class App extends NextApp<AppProps> {
  public render() {
    const {Component, pageProps, apolloClient} = this.props

    return <Container>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Container>
  }
}

export default withApollo(App)
