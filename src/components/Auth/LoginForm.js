"use client";
import { Form, Input, Button, notification, Card, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { login } from '@/utils/api';
import Link from "next/link";

const { Title } = Typography;

export default function LoginForm() {
    const router = useRouter();

    const onFinish = async (values) => {
        try {
           const response = await login(values);
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('isAuthenticated', 'true');
            notification.success({
                message: 'Login Successful',
                description: 'You have successfully logged in.',
            });
            await router.push('/');
        } catch (error) {
            notification.error({
                message: 'Login Failed',
                description: error.message,
            });
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5',  marginTop:"50px" }}>
            <Card
                title={<Title level={2} style={{ textAlign: 'center' }}>Login</Title>}
                style={{ width: 400, padding: '24px' }}
                bodyStyle={{ padding: '24px' }}
            >
                <Form
                    name="login"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
                    >
                        <Input size="large" placeholder="Enter your email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: 'Please enter your password!' }]}
                    >
                        <Input.Password size="large" placeholder="Enter your password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            Login
                        </Button>
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0 }}>
                        <Link href="/auth/forgot-password">Forgot Password?</Link>
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0 }}>
                        Don't have an account - <Link href="/auth/signup">Sign up</Link>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}
