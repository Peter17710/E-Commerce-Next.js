import { cookies } from "next/headers"
import { decode } from "next-auth/jwt"


export async function getUserToken(){


          const encoddedToken = (await cookies()).get("next-auth.session-token")?.value
                const decrepToken = await decode({ token: encoddedToken , secret: process.env.NEXTAUTH_SECRET !})
                const token = decrepToken?.token as string

    return token
}