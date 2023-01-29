import { Nav } from '../components/Nav'
import '../styles/globals.css'
import { client } from '../gqlClient'
import { ApolloProvider } from '@apollo/client'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Provider } from '../context';

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
        <UserProvider>
            <ApolloProvider client={client}>
                <Nav />
                <Component {...pageProps} />
            </ApolloProvider>
        </UserProvider>
    </Provider>
  )
}

export default MyApp
