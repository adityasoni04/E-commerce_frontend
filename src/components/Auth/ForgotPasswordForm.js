"use client";
import {Form, Input, Button, notification, Card} from 'antd';
import { useRouter } from 'next/navigation';
import { forgotPassword } from '@/utils/api';

export default function ForgotPassword() {
    const router = useRouter();

    const onFinish = async (values) => {
        try {
            await forgotPassword(values);
            notification.success({
                message: 'OTP Sent',
                description: 'An OTP has been sent to your email. Please use it to reset your password.',
            });
            router.push('/auth/reset-password');
        } catch (error) {
            notification.error({
                message: 'Error',
                description: error.message,
            });
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
            <Card title="Forgot Password" style={{ width: 400, padding: '24px' }}>
                <Form
                    name="forgot-password"
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
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            Send OTP
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}
