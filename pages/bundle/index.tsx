import gql from 'graphql-tag'
import {NextContext} from 'next'
import {Component} from 'react'
import {Query} from 'react-apollo'

const QUERY = gql`
  query subscribable($handle: String!) {
    subscribable(handle: $handle) {
      id
      products {
        id
        shopifyProduct {
          id
          title
          variants {
            id
            price
            title
          }
        }
      }
      sizes {
        id
        numVariants
        price
      }
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
        console.log(data.subscribable)

        return <div>
          <h1>Bundle Builder</h1>

          <h2>Select your frequency</h2>
          <input type='number' name='freqNum' />
          <select name='freqUnit'>
            {['days', 'weeks', 'months'].map(unit => <option key={unit} value={unit}>{unit}</option>)}
          </select>

          <h2>Select your size</h2>
          <select name='size'>
            {data.subscribable.sizes.map(size => <option key={size.id} value={size.numVariants}>
              {size.numVariants} for {size.price}
            </option>)}
          </select>

          <h2>Select your variants</h2>
          {data.subscribable.products.map(product => <div key={product.id}>
            <h4>{product.shopifyProduct.title}</h4>
            {product.shopifyProduct.variants.map(variant => <div key={variant.id}>
              <span>{variant.title}</span>
              <select>
                {new Array(13).fill(undefined).map((_, i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>)}
          </div>)}

          <div>
            <button type='submit'>Add to cart</button>
          </div>
        </div>
      }}
    </Query>
  }
}
