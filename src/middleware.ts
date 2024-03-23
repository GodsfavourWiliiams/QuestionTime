import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextRequest, NextResponse } from 'next/server';
import { TOKEN } from './lib/utils';

export const isAuthenticated = (request: NextRequest) => {
  const cookies = request.cookies;

  if (cookies) {
    return (
      !!cookies.get(TOKEN.ACCESS)?.value &&
      request.cookies.get(TOKEN.ACCESS)?.value !== 'undefined'
    );
  }
};

export const removeAuthorization = (cookies: RequestCookies) => {
  // remove the user token from the cookies
  cookies.set({
    name: TOKEN.ACCESS,
    value: '',
  });
};

export async function middleware(request: NextRequest) {
  const isLoggedIn = isAuthenticated(request);

  const token = request.cookies.get(TOKEN.ACCESS)?.value;
  if (request.nextUrl.pathname === '/') {
    // If the user is logged in and accessing the login page, redirect them to the dashboard
    if (isLoggedIn) {
      return NextResponse.redirect(
        new URL('/dashboard', request.nextUrl.origin)
      );
    }
    // If the user is not logged in and accessing the login page, proceed with the request
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    // User is not authenticated
    // If the user is not logged in or doesn't have a role, redirect them to the login page
    return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
  }
}

export const config = {
  matcher: ['/', '/dashboard'],
};
