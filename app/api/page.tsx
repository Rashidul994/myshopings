// import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';

// export async function POST(req) {
//   const { email, password } = await req.json();

//   if (email === 'admin@gmail.com' && password === '0000') {
//     const token = jwt.sign({ email }, 'secret', { expiresIn: '1d' });
//     const response = NextResponse.json({ success: true });
//     response.cookies.set('token', token, { httpOnly: true });
//     return response;
//   }

//   return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
// }

// pages/api/auth/[...nextauth].ts

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
