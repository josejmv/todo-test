// main tools
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

// utils
import { initializeApolloClient } from 'lib/apollo'
import { GET_USER_BY_EMAIL } from 'lib/queries/User'

// types
import { NextApiRequest, NextApiResponse } from 'next'
import { Account, Profile, User, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'

const options = {
  pages: {
    error: '/login', // custom error page with query string as ?error=
  },

  session: {
    // initial value in seconds
    maxAge: 30 * 60, // logout on a half hour of inactivity
  },

  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    Providers.Credentials({
      name: 'credentials',
      id: 'credentials',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },

      /**
       * verify if the email is found in 8base
       * and if the password is equal to "JoseJMV"
       *
       * @param credentials
       * @returns
       */
      async authorize(credentials: { email: string; password: string }) {
        const apolloClient = initializeApolloClient()
        const { data } = await apolloClient.query({
          query: GET_USER_BY_EMAIL,
          variables: { email: credentials.email },
        })

        if (data.user && credentials.password === 'JoseJMV')
          return {
            name: credentials.email.split('@')[0],
            email: credentials.email,
            password: credentials.password,
          }
        else return null
      },
    }),
  ],

  callbacks: {
    /**
     * @param token decrypted jwt
     * @param data user received afther authorize method
     * @param account provider account
     * @param profile provider profile
     * @param isNewUser true if new user
     *
     * @return jwt that will be send to session callback
     */
    jwt: async (
      token: JWT,
      data: User,
      account: Account,
      profile: Profile,
      isNewUser: boolean
    ) => {
      if (data) {
        const apolloClient = initializeApolloClient()
        const response = await apolloClient.query({
          query: GET_USER_BY_EMAIL,
          variables: { email: data?.email },
        })

        if (!response.data.user) token = null
        else token = { ...data, ...profile }
      }
      return Promise.resolve(token)
    },

    /**
     * @param session current session object
     * @param token User object if is imported by a database or a JWT if isn't
     *
     * @return session that will be returned to the client
     */
    session: (session: Session, token: JWT) => {
      session = { ...session, ...token }
      return Promise.resolve(session)
    },
  },
}

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)
