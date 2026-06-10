import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

async function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET || "bir-fallback-secret-key-2024";
  return await jwtVerify(token, new TextEncoder().encode(secret));
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = request.nextUrl.pathname === '/admin/login';

  if (isAdminPage && !isLoginPage) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await verifyToken(token);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  if (isLoginPage && token) {
    try {
      await verifyToken(token);
      return NextResponse.redirect(new URL('/admin', request.url));
    } catch (error) {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
