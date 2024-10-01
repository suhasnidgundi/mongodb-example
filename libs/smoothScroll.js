'use client'
import { useEffect } from 'react';

export default function SmoothScroll({ children }) {
    useEffect(() => {
        const smoothScroll = (e) => {
            e?.preventDefault();
            const href = e?.currentTarget?.getAttribute('href');
            document.querySelector(href)?.scrollIntoView({
                behavior: 'smooth'
            });
        };

        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => link.addEventListener('click', smoothScroll));

        return () => links.forEach(link => link.removeEventListener('click', smoothScroll));
    }, []);

    return <>{children}</>;
}