"use client";
import Link from 'next/link';
import React from 'react';
import {
    RegisterLink,
    LoginLink,
    LogoutLink,
    useKindeAuth
} from "@kinde-oss/kinde-auth-nextjs";


const Header = () => {
    const { isAuthenticated, user } = useKindeAuth();

    return (
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <Link href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                <span className="fs-4">Student Portal</span>
            </Link>

            {isAuthenticated ? (
                <div className="d-flex align-items-center">

                    <div className="dropdown">
                        <button
                            className="btn btn-link text-decoration-none dropdown-toggle d-flex align-items-center"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {user?.picture ? (
                                <img
                                    src={user.picture}
                                    alt="Profile"
                                    className="rounded-circle me-2"
                                    width="32"
                                    height="32"
                                />
                            ) : (
                                <div
                                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                                    style={{ width: "32px", height: "32px" }}
                                >
                                    {user?.given_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
                                </div>
                            )}
                            <span>{user?.given_name || 'User'}</span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <Link className="dropdown-item" href="/dashboard/profile">
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" href="/dashboard/settings">
                                    Settings
                                </Link>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                                <LogoutLink className="dropdown-item text-danger">
                                    Sign out
                                </LogoutLink>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="d-flex align-items-center">
                    <LoginLink className="btn btn-outline-primary me-2">
                        Log in
                    </LoginLink>
                    <RegisterLink className="btn btn-primary">
                        Sign up
                    </RegisterLink>
                </div>
            )}
        </header>
    );
};

export default Header;