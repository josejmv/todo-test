// main tools
import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'lib/apollo'
import { AppProvider } from '@8base/app-provider'
import { Provider } from 'next-auth/client'
import Head from 'next/head'

// components
import { PageLoader } from 'components/atoms/PageLoader'

// prime components
import { ScrollTop } from 'primereact/scrolltop'

// styles
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'styles/globals.scss'

// types
import { NextPage } from 'next'
import { AppProps } from 'next/app'

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <>
      <Head>
        <title>Todo Test</title>
        <meta name='description' content='Todo test' />
        <meta name='author' content='JoseJMV' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {/* @ts-ignore */}
      <AppProvider uri={process.env.NEXT_PUBLIC_BASE_API_URL}>
        {({ loading }) =>
          loading ? (
            <PageLoader />
          ) : (
            <ApolloProvider client={apolloClient}>
              <Provider session={pageProps.session}>
                <Component {...pageProps} />
              </Provider>
              <ScrollTop />
            </ApolloProvider>
          )
        }
      </AppProvider>
    </>
  )
}

export default MyApp
