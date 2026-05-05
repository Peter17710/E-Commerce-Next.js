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
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
    method: 'POST',
    body: JSON.stringify({
        email: credentials?.email,
        password: credentials?.password
        }),
          headers: { "Content-Type": "application/json" },
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
    async jwt({ token, user }) {
        if (user) {
            token.token = (user as any).token // ✅ save Route API token
        }
        return token
    },
    async session({ session, token }) {
        (session as any).token = token.token // ✅ expose token in session
        return session
    }
},
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

// Next.js expects these to be the only exports for HTTP methods
export { handler as GET, handler as POST, handler as OPTIONS }