import {Field, FieldArray, Form, Formik} from 'formik'
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

interface FormValues {
  freqNum: string,
  freqUnit: string,
  sizeId: number,
  variants: object[],
}

const freqUnits = ['days', 'weeks', 'months']

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

        return <div>
          <h1>Bundle Builder</h1>

          <Formik
            initialValues={{
              freqNum: '',
              freqUnit: freqUnits[0],
              size: data.subscribable.sizes[0],
              variants: [],
            }}
            onSubmit={this.handleSubmit}
            render={({handleChange, values}) => <Form>
              <h2>Select your frequency</h2>
              <Field name='freqNum' type='number' />

              <select name='freqUnit' onChange={handleChange} value={values.freqUnit}>
                {freqUnits.map(unit => <option key={unit} value={unit}>{unit}</option>)}
              </select>

              <h2>Select your size</h2>
              <select name='size' onChange={handleChange} value={values.size.id}>
                {data.subscribable.sizes.map(size => <option key={size.id} value={size}>
                  {size.numVariants} for {size.price}
                </option>)}
              </select>

              <FieldArray
                name='variants'
                render={({remove, push}) => <div>
                  <h2>Select your variants</h2>
                  {data.subscribable.products.map(product => <div key={product.id}>
                    <h4>{product.shopifyProduct.title}</h4>
                    {product.shopifyProduct.variants.map(variant => <div key={variant.id}>
                      <span>{variant.title}</span>
                      <button onClick={() => push(variant)} type='button'>Add</button>
                    </div>)}
                  </div>)}

                  <h3>Selected variants</h3>
                  {values.variants.map((variant, i) => <span key={i}>
                    {variant.title} <button onClick={() => remove(i)} type='button'>Rem</button>
                  </span>)}
                </div>}
              />

              <div>
                <button type='submit'>Add to cart</button>
              </div>
            </Form>}
          />
        </div>
      }}
    </Query>
  }

  private handleSubmit = (input) => {
    console.log(input)
    // TODO: validate
    // TODO: add to cart
  }
}
