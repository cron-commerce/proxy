import gql from 'graphql-tag'
import {NextContext} from 'next'
import {Component} from 'react'
import {Query} from 'react-apollo'

const QUERY = gql`
  query subscribable($handle: String!) {
    subscribable(handle: $handle) {
      id
    }
  }
`

interface Props {
  handle: string,
}

export default class BundlePage extends Component<Props> {
  public static getInitialProps(ctx: NextContext) {
    const {handle} = ctx.query
    return {handle}
  }

  public render() {
    return <Query query={QUERY} variables={{handle: this.props.handle}}>
      {({data, loading, error}) => {
        if (error) { return <div>error</div> }
        if (loading) { return <div>loading...</div> }
        return <div>bundle</div>
      }}
    </Query>
  }
}
