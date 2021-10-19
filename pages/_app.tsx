// main tools
import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'lib/apollo'
import { AppProvider } from '@8base/app-provider'
import { Provider } from 'next-auth/client'
import { useRouter } from 'next/router'
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
  const { asPath } = useRouter()
  const permalink = `${process.env.NEXT_PUBLIC_LOCAL_URL}${asPath}`
  const apolloClient = useApollo(pageProps.initialApolloState) // initialize apollo client

  return (
    <>
      <Head>
        <title>Todo Test</title>
        <meta charSet='utf-8' />
        <meta
          name='keywords'
          content='Next.js,React.js,Vercel,8base,8 base,Cypress,Todo'
        />
        <meta name='description' content='Todo test' />
        <meta name='author' content='JoseJMV' />
        <meta name='copyright' content='JoseJMV' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='canonical' href={permalink} />
        <meta property='og:url' content={permalink} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Todo Test' />
        <meta
          property='og:description'
          content='Todo test, personal project made by JoseJMV'
        />
        {/* <meta property='og:image' content={metaData.ogImage?.url} /> */}
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
