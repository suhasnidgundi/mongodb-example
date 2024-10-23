// middleware.ts
import { NextResponse } from 'next/server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

// Define route patterns
const publicRoutes = ['/', '/terms', '/privacy']
const authRoutes = ['/api/auth/kinde_callback', '/api/auth/login', '/api/auth/register']
const dashboardRoutes = [
    '/dashboard',
    '/dashboard/profile',
    '/dashboard/student-form',
    '/dashboard/settings',
    '/dashboard/notifications'
]

export async function middleware(request) {
    const { pathname } = request.nextUrl
    const { isAuthenticated, getUser } = getKindeServerSession()

    // Check authentication
    const isAuthed = await isAuthenticated()

    // Allow access to public routes and auth endpoints
    if (publicRoutes.includes(pathname) || authRoutes.includes(pathname)) {
        return NextResponse.next()
    }

    // Handle dashboard routes
    if (pathname.startsWith('/dashboard')) {
        if (!isAuthed) {
            const loginUrl = new URL('/api/auth/login', request.url)
            return NextResponse.redirect(loginUrl)
        }

        // Get user data
        const user = await getUser()
        const isRegistered = user?.given_name && user?.family_name &&
            user?.email && user?.metadata?.hasSubmittedForm === 'true'

        // Handle form access for registered users
        if (pathname === '/dashboard/student-form' && isRegistered) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }

        // Redirect unregistered users to form
        if (pathname !== '/dashboard/student-form' && !isRegistered) {
            return NextResponse.redirect(new URL('/dashboard/student-form', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/dashboard/:path*',
        '/api/auth/:path*'
    ]
}