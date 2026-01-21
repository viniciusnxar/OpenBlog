import NextAuth from 'next-auth';
import authConfig from './auth.config';

export const { auth: proxy } = NextAuth(authConfig);

export default proxy((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  console.log('Pathname:', nextUrl.pathname, isLoggedIn);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
