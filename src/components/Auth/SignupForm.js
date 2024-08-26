"use client";
import { Form, Input, Button, notification, Card, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { signup } from '@/utils/api';
import Link from "next/link";

const { Title } = Typography;

export default function SignupForm() {
    const router = useRouter();

    const onFinish = async (values) => {
        try {
        const response = await signup(values);
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('isAuthenticated', 'true');
            notification.success({
                message: 'Signup Successful',
                description: 'You have successfully signed up.',
            });
            await router.push('/');
        } catch (error) {
            notification.error({
                message: 'Signup Failed',
                description: error.message,
            });
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5', marginTop:"70px" }}>
            <Card
                title={<Title level={2} style={{ textAlign: 'center' }}>Sign Up</Title>}
                style={{ width: 400, padding: '24px' }}
                bodyStyle={{ padding: '24px' }}
            >
                <Form
                    name="signup"
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
                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password size="large" placeholder="Confirm your password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            Sign Up
                        </Button>
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0 }}>
                        Already have an account - <Link href="/auth/login">LogIn</Link>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}
