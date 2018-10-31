import {NextContext} from 'next'
import {Component} from 'react'

export default class BundlePath extends Component<{}> {
  public static getInitialProps(ctx: NextContext) {
    console.log(ctx.query)
    return {}
  }

  public render() {
    return <div>bundle</div>
  }
}
