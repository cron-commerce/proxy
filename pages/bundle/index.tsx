import {NextContext} from 'next'
import {Component} from 'react'
import {Query} from 'react-apollo'

export default class BundlePath extends Component<{}> {
  public static getInitialProps(ctx: NextContext) {
    return {}
  }

  public render() {
    return <div>bundle</div>
  }
}
