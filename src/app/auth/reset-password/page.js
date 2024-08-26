"use client"; // Ensure this component is client-side
import { Form, Input, Button, notification, Card, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import {resetPassword} from "../../../utils/api"
const { Title } = Typography;

export default function ResetPassword() {
    const router = useRouter();

    const onFinish = async (values) => {
        try {
            await resetPassword({
                otp: values.otp,
                password: values.password
            });
            notification.success({
                message: 'Password Reset Successful',
                description: 'Your password has been reset successfully.',
            });
            router.push('/auth/login');
        } catch (error) {
            notification.error({
                message: 'Error',
                description: error.message,
            });
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
            <Card title={<Title level={2} style={{ textAlign: 'center' }}>Reset Password</Title>} style={{ width: 400, padding: '24px' }}>
                <Form
                    name="reset-password"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="otp"
                        label="OTP"
                        rules={[{ required: true, message: 'Please enter the OTP!' }]}
                    >
                        <Input size="large" placeholder="Enter OTP" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="New Password"
                        rules={[{ required: true, message: 'Please enter your new password!' }]}
                    >
                        <Input.Password size="large" placeholder="Enter new password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            Reset Password
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}
