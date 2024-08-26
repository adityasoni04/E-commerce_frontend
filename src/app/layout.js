"use client"
import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import '../styles/globals.css'; // Ensure this path is correct
import AppHeader from '../components/common/Header';
import AppFooter from '../components/common/Footer';
import FullScreenSpinner from '../components/common/FullScreenSpinner'; // Adjust path as needed
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

 const metadata = {
    title: 'StyleShopping',
    description: 'An E-commerce App Build By Aditya Soni using Next.js & Node.js',
};

export default function RootLayout({ children }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate a loading period (e.g., fetching data or other initialization tasks)
        const timer = setTimeout(() => setIsLoading(false), 1000); // Adjust as needed

        return () => clearTimeout(timer);
    }, []);

    return (
        <html lang="en">
        <head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
        </head>
        <body className={inter.className}>
        {isLoading && <FullScreenSpinner />}
        <AppHeader />
        <main>{children}</main>
        <AppFooter />
        </body>
        </html>
    );
}