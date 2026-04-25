import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// 1. Rename 'options' to 'authOptions' to avoid Next.js export conflicts
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        // We keep 'email' as the label for your UI
        email: { label: "Email/Username", type: "text" }, 
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("Credentials received in authorize:", credentials);
        const res = await fetch("https://dummyjson.com/auth/login", {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // 2. DummyJSON expects 'username', NOT 'email'
            username: credentials?.email, 
            password: credentials?.password,
            expiresInMins: 60, // optional
          }),
        })

        const user = await res.json()

        // 3. Debugging: If login fails, this will show you why in your terminal
        if (!res.ok) {
          console.error("Login failed:", user)
          return null
        }

        return user
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
    async session({ session, token }) {
      // In NextAuth v4, 'user' is often undefined when using JWT strategy
      // Use the 'token' to pass data to the session
      return { ...session, user: { ...session.user, ...token } }
    },
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user }
      }
      return token
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

// Next.js expects these to be the only exports for HTTP methods
export { handler as GET, handler as POST, handler as OPTIONS }