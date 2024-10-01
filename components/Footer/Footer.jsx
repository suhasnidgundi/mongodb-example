import Link from 'next/link';

export const socialLinks = [
    { href: 'https://www.instagram.com/suhasnidgundi', icon: 'bi-instagram' },
    { href: 'https://www.linkedin.com/in/suhasnidgundi/', icon: 'bi-linkedin' },
    { href: 'http://suhasnidgundi.me/', icon: 'bi-globe-central-south-asia' }
];

const Footer = ({ companyName, year, links }) => {
    return (
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div className="col-md-4 d-flex align-items-center">
                <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
                    <svg className="bi" width="30" height="24"></svg>
                </a>
                <span className="mb-3 mb-md-0 text-body-secondary">
                    &copy; {year} <Link href={links.companyUrl} className="text-decoration-none">{companyName}</Link>, Inc
                </span>
            </div>

            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                {links.socialLinks.map((social, index) => (
                    <li className="ms-3" key={index}>
                        <a className="text-body-secondary" href={social.href} target="_blank" rel="noopener noreferrer">
                            <i className={`bi ${social.icon}`}></i>
                        </a>
                    </li>
                ))}
            </ul>
        </footer>
    );
};

export default Footer;
