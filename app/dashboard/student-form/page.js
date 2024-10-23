// app/dashboard/student-form/page.js
import StudentDetailsForm from '@/components/StudentDetailsForm/StudentDetailsForm'
import { preventRegistered, updateRegistrationStatus } from '@/utils/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function StudentFormPage() {
    const user = await preventRegistered()

    const userData = {
        firstName: user.given_name || '',
        lastName: user.family_name || '',
        email: user.email || '',
    }

    async function handleFormSubmit(formData) {
        'use server'

        try {
            // Get the host from headers
            const headersList = headers()
            const host = headersList.get('host')
            const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'

            // Combine Kinde user data with form data
            const combinedData = {
                ...userData,
                ...Object.fromEntries(formData),
            }

            // Make the API call with absolute URL
            const response = await fetch(`${protocol}://${host}/api/student`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(combinedData),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to submit form')
            }

            // Update registration status in Kinde
            await updateRegistrationStatus(user.id)

            redirect('/dashboard')
        } catch (error) {
            console.error('Error in handleFormSubmit:', error)
            throw error
        }
    }

    return <StudentDetailsForm kindeUserData={userData} onSubmit={handleFormSubmit} />
}