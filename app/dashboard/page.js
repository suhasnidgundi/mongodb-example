// app/dashboard/page.tsx
import { checkRegistration } from '@/utils/auth'

export default async function DashboardPage() {
    const user = await checkRegistration()

    console.log("User : ",user)

    return (
        <div className="container">
            <h1>Welcome, {user.given_name || 'User'}!</h1>
            {user.metadata?.isRegistered === 'true' && (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Registration Status</h5>
                        <p className="card-text">
                            Registered on: {new Date().toLocaleDateString()}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}