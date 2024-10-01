import Link from 'next/link';
import React from 'react'

export const navItems = [
    { name: 'New Form', path: '/new_form' },
    { name: 'Submitted Form', path: '/list_forms' },
];

const Header = () => {
    return (
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <Link href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                {/* <i className="bi bi-instagram"></i> */}
                <span className="fs-4">MongoDB Example</span>
            </Link>
            <ul className="nav nav-pills">
                {navItems?.map((item) => (
                    <li className="nav-item" key={item.name}>
                        <Link className='nav-link active mx-2' href={item.path} passHref>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </header>
    )
}

export default Header