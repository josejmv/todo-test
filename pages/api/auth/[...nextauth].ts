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
  pages: { error: '/login' }, // custom error page with query string as ?error=
  session: { maxAge: 30 * 60 }, // initial value in seconds, logout on a half hour of inactivity

  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    Providers.Credentials({
      name: 'credentials',
      id: 'credentials',
      credentials: { email: { type: 'email' }, password: { type: 'password' } },

      /**
       * verify if the email is found in 8base as josejmvasquez@gmail.com
       *
       * @param credentials
       * @returns
       */
      async authorize(credentials: { email: string; password: string }) {
        const apolloClient = initializeApolloClient()
        const { data } = await apolloClient.query({
          query: GET_USER_BY_EMAIL,
          variables: { email: 'josejmvasquez@gmail.com' },
        })

        if (data.user)
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
          variables: { email: 'josejmvasquez@gmail.com' },
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
    session: (session: Session, token: JWT) =>
      Promise.resolve({ ...session, ...token }),
  },
}

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)
