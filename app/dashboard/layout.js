import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server'
import Link from 'next/link'
import { requireAuth } from '@/utils/auth'

export default async function DashboardLayout({
    children
}) {
    const user = await requireAuth()
    const isRegistered = user?.given_name && user?.family_name &&
        user?.email && user?.metadata?.hasSubmittedForm === 'true'

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3 col-lg-2 d-md-block sidebar">
                    <div className="position-sticky pt-3">
                        <div className="px-3 py-2 mb-3">
                            <h5>Welcome, {user.given_name || 'User'}</h5>
                            <small className="text-muted">{user.email}</small>
                        </div>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link
                                    href="/dashboard"
                                    className="nav-link active"
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    href="/dashboard/profile"
                                    className="nav-link"
                                >
                                    Profile
                                </Link>
                            </li>
                            {!isRegistered && (
                                <li className="nav-item">
                                    <Link
                                        href="/dashboard/student-form"
                                        className="nav-link"
                                    >
                                        Student Registration
                                    </Link>
                                </li>
                            )}
                            <li className="nav-item">
                                <Link
                                    href="/dashboard/settings"
                                    className="nav-link"
                                >
                                    Settings
                                </Link>
                            </li>
                        </ul>
                        <div className="px-3 py-2 mt-auto">
                            <LogoutLink className="btn btn-outline-danger">
                                Sign Out
                            </LogoutLink>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    {children}
                </main>
            </div>
        </div>
    )
}