// utils/auth.ts
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'

export async function getUser() {
    const { getUser, isAuthenticated } = getKindeServerSession()
    const isAuthed = await isAuthenticated()

    if (!isAuthed) {
        return null
    }

    const user = await getUser()
    return user
}

export async function requireAuth() {
    const { isAuthenticated } = getKindeServerSession()
    const isAuthed = await isAuthenticated()

    if (!isAuthed) {
        redirect('/api/auth/login') // Kinde's login endpoint
    }

    const user = await getUser()
    return user
}

export async function checkRegistration() {
    const user = await requireAuth()

    // Check if user is registered by looking at Kinde user metadata
    const isRegistered = user?.metadata?.isRegistered === 'true'

    if (!isRegistered) {
        redirect('/dashboard/student-form')
    }

    return user
}

export async function preventRegistered() {
    const user = await requireAuth()

    // Check if user is registered by looking at Kinde user metadata
    const isRegistered = user?.metadata?.isRegistered === 'true'

    if (isRegistered) {
        redirect('/dashboard')
    }

    return user
}

// Helper function to update user registration status
export async function updateRegistrationStatus(userId) {
    const { getAccessToken } = getKindeServerSession()
    const token = await getAccessToken()

    // Update user metadata in Kinde
    await fetch(`${process.env.KINDE_ISSUER_URL}/api/v1/user`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: userId,
            metadata: {
                isRegistered: 'true',
                registrationDate: new Date().toISOString()
            }
        })
    })
}