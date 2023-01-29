import type { NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';
import ProductList from '../components/ProductList';

const GEP_PRODUCTS = gql`
query {
  getAllProducts {
    data {
      _id
      name
      description
      price
      imageUrl
      shop {
        _id
      }
    }
  }
}
`;

const Home: NextPage = () => {
  const { data, loading } = useQuery(GEP_PRODUCTS);
  console.log(data)

  if( loading ) return <p>...Loading</p>;

  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      Hello World
      <ProductList products={data?.getAllProducts.data} />
    </div>
  )
}

export default Home