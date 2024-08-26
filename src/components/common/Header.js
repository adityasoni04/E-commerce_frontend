"use client";
import { Layout, Menu, Button, Badge } from 'antd';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Header } = Layout;

const menuItemStyle = {
    fontSize: '1rem',
    fontWeight: '500',
    color: '#333',
};

const buttonStyle = {
    fontSize: '1rem',
    fontWeight: '500',
    color: "red"
};

export default function AppHeader() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [cartItemCount, setCartItemCount] = useState(0);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const authStatus = localStorage.getItem('isAuthenticated');
        setIsAuthenticated(!!token && authStatus === 'true');
    }, [pathname]);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const authStatus = localStorage.getItem('isAuthenticated');
        const cartItems = localStorage.getItem('cartItems');

        setIsAuthenticated(!!token && authStatus === 'true');
        setCartItemCount(cartItems ? JSON.parse(cartItems).length : 0);

        const handleCartUpdate = () => {
            const updatedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            setCartItemCount(updatedCartItems.length);
        };

        window.addEventListener('cartUpdated', handleCartUpdate);

        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('cartItems');
        localStorage.removeItem('token');

        setIsAuthenticated(false);
        setCartItemCount(0);

        router.push('/');
    };

    return (
        <Header style={{ background: '#fff', padding: '0 20px', position: 'fixed', width: '100%', top: 0, left: 0, zIndex: 1000 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    <Link href="/">StyleShopping App</Link>
                </div>
                <div style={{ flex: 1 }}>
                    <Menu
                        theme="light"
                        mode="horizontal"
                        style={{ lineHeight: '64px', display: 'flex', justifyContent: 'flex-end', margin: 0 }}
                    >
                        <Menu.Item key="1" style={menuItemStyle}>
                            <Link href="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item key="2" style={menuItemStyle}>
                            <Link href="/dashboard">Dashboard</Link>
                        </Menu.Item>
                        {!isAuthenticated ? (
                            <>
                                <Menu.Item key="3" style={menuItemStyle}>
                                    <Link href="/auth/login">Login</Link>
                                </Menu.Item>
                                <Menu.Item key="4" style={menuItemStyle}>
                                    <Link href="/auth/signup">Sign Up</Link>
                                </Menu.Item>
                            </>
                        ) : (
                            <Menu.Item key="5" style={{ padding: 0 }}>
                                <Button type="danger" onClick={handleLogout} style={buttonStyle}>Logout</Button>
                            </Menu.Item>
                        )}
                    </Menu>
                </div>
                <Link href="/dashboard" style={{ position: 'relative', marginRight: '52px', display: 'flex', alignItems: 'center' }}>
                    <ShoppingCartOutlined style={{ fontSize: '1.8rem' }} />
                    <Badge
                        count={cartItemCount}
                        showZero
                        overflowCount={99}
                        offset={[0, 0]}
                        style={{
                            backgroundColor: '#ff4d4f',
                            color: '#fff',
                            fontSize: '0.75rem',
                            minWidth: '20px',
                            height: '20px',
                            lineHeight: '20px',
                            borderRadius: '50%',
                            display: cartItemCount > 0 ? 'flex' : 'none',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            top: '-22px',
                            right: '-11px',
                        }}
                    />
                </Link>
            </div>
        </Header>
    );
}
