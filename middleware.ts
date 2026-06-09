import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from './lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = request.nextUrl.pathname === '/admin/login';

  if (isAdminPage && !isLoginPage) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await verifyAuth(token);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  if (isLoginPage && token) {
    try {
      await verifyAuth(token);
      return NextResponse.redirect(new URL('/admin', request.url));
    } catch (error) {
      // Token invalid, allow them to stay on login page
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
