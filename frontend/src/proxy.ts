// proxy.ts
// import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1. Specify paths that require custom authorization
// const protectedRoutes = ['/', '/task','/create-workspace'];
// const authRoutes = ['/login', '/register'];

export async function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   if(authRoutes.includes(pathname)){
//     return NextResponse.next()
//   }
//   // 2. Evaluate if the target route is protected
//   const isProtected = protectedRoutes.some((route) => route === '/' ? pathname === '/' : pathname.startsWith(route));
//   if (!isProtected) {
//     return NextResponse.next();
//   }

//   // 3. Extract your custom authentication token from cookies
//   const authToken = request.cookies.get('custom_auth_token')?.value;

//   // 4. Fallback or redirect if no token exists
//   if (!authToken) {
//     const loginUrl = new URL('/login', request.url);
//     // loginUrl.searchParams.set('next', pathname); // Store original path for post-login redirect
//     return NextResponse.redirect(loginUrl);
//   }

//   try {
//     // 5. Custom verification logic (e.g., verifying a stateless JWT token signature)
//     // Note: Use lightweight cryptographic web APIs (like Jose), not heavy Node.js libraries
//     const isValidSession = await verifyCustomToken(authToken);

//     if (!isValidSession) {
//       return NextResponse.redirect(new URL('/login', request.url));
//     }

//     return NextResponse.next();
//   } catch (error) {
//     // Handle expired tokens or decryption anomalies
//     console.warn(error)
//     return NextResponse.redirect(new URL('/login', request.url));
//   }
}

// 6. Leverage matchers to optimize execution and ignore static assets
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

// // Mock helper function for custom validation
// async function verifyCustomToken(token: string): Promise<boolean> {
//   // Your custom decoding/crypto signature verification logic here
//   return token === 'valid-token-example';
// }
