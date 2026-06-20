import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

// Refreshes the Supabase session cookie and protects /admin (except the login
// page). Unauthenticated visitors to /admin are redirected to /admin/login.
export async function middleware(request) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isLogin = pathname === '/admin/login';

  if (!user && !isLogin) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  if (user && isLogin) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
