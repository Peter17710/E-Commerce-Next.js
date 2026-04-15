import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Email from "next-auth/providers/email"



export const options : NextAuthOptions = {
providers: [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: 'Credentials',
 
    credentials: {
      email: { label: "Email", type: "email"},
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {

      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
        method: 'POST',
        body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
        }),
        headers: { "Content-Type": "application/json" }
      })
      const user = await res.json()

      // If no error and we have user data, return it
      if (res.ok && user) {
        return user
      }
      // Return null if user data could not be retrieved
      return null
    }
  })
],

session: {
        strategy: 'jwt',
},

pages: {
    signIn: '/login',
},

callbacks: {
    async session({ session, user, token }) {
      return {...session, ...token, ...user}
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return {...token, ...user}
    }
},

secret: process.env.AUTH_SECRET,



}
const handler = NextAuth(options)

export { handler as GET, handler as POST }