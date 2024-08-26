"use client";
import { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Modal, List, Empty, Typography, notification, Spin, Avatar } from 'antd';
import { FaTrash } from 'react-icons/fa';
import { fetchUserInfo } from '../../utils/api';

const { Title } = Typography;

export default function UserDashboard() {
    const [userInfo, setUserInfo] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const authStatus = localStorage.getItem('isAuthenticated');

        setIsAuthenticated(authStatus === 'true');

        if (token && authStatus === 'true') {
            const fetchData = async () => {
                try {
                    const data = await fetchUserInfo(token);
                    setUserInfo(data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching user info:', error);
                    setError('Failed to load user information.');
                    setLoading(false);
                }
            };

            fetchData();

            const items = JSON.parse(localStorage.getItem('cartItems')) || [];
            setCartItems(items);
        } else {
            setLoading(false);
            setError('You need to log in to view this content.');
        }
    }, []);

    const handleRemoveItem = (itemIndex) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(itemIndex, 1);

        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

        notification.success({
            message: 'Item Removed',
            description: 'The item has been removed from your cart.',
        });
    };

    const showRemoveConfirmation = (index) => {
        setSelectedItemIndex(index);
        setIsModalVisible(true);
    };

    const handleModalOk = () => {
        if (selectedItemIndex !== null) {
            handleRemoveItem(selectedItemIndex);
        }
        setIsModalVisible(false);
        setSelectedItemIndex(null);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setSelectedItemIndex(null);
    };

    const getUserNameFromEmail = (email) => {
        return email.split('@')[0];
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div style={{ minHeight: "84vh"}}>
            <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>My Dashboard</Title>
            {loading ? (
                <Spin size="large" tip="Loading user information..." />
            ) : !isAuthenticated ? (
                <Card title="Access Denied" bordered={false}>
                    <p>You need to log in to view this content. Please <a href="/auth/login">log in</a> first.</p>
                </Card>
            ) : error ? (
                <Card title="User Information" bordered={false}>
                    <p>{error}</p>
                </Card>
            ) : (
                userInfo ? (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>

                        <Card
                            title="User Information"
                            bordered={false}
                            style={{
                                width: '90%',
                                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                                borderRadius: '12px',
                                padding: '20px',
                                textAlign: 'center',
                                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                backgroundColor: '#f0f2f5' ,
                                marginBottom: "20px",
                            }}
                            cover={<Avatar size={110} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF9K9c2nz6mu8dSYSQNX50GNDU6_HHJP74vd71hST-ej98DWUe1HP6udDmpoAU31CDxsA&usqp=CAU"  style={{ margin: '0 auto', borderRadius: '50%'  }} />}
                        >
                            <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}><strong>Name:</strong> {getUserNameFromEmail(userInfo.email)}</p>
                            <p style={{ fontSize: '1rem', marginBottom: '10px' }}><strong>Email:</strong> {userInfo.email}</p>
                            <p style={{ fontSize: '1rem', marginBottom: '0' }}><strong>Joined:</strong> {formatDate(userInfo.createdAt)}</p>
                        </Card>
                    </div>
                ) : (
                    <Card title="User Information" bordered={false}>
                        <p>No user information available. Please log in.</p>
                    </Card>
                )
            )}
            {isAuthenticated && (
                <Row gutter={16}>
                    <Col span={24}>
                        <Card
                            title={<span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Cart Items</span>}
                            style={{ fontSize: '1.25rem' }}
                            bordered={false}
                        >
                            {cartItems.length > 0 ? (
                                <List
                                    dataSource={cartItems}
                                    renderItem={(item, index) => (
                                        <List.Item
                                            actions={[
                                                <Button
                                                    type="text"
                                                    icon={<FaTrash />}
                                                    onClick={() => showRemoveConfirmation(index)}
                                                />
                                            ]}
                                        >
                                            <List.Item.Meta
                                                avatar={<img src={item.image} alt={item.name} style={{ width: 50, height: 50, objectFit: 'cover' }} />}
                                                title={item.name}
                                                description={`Price: Rs.${item.price}`}
                                            />
                                        </List.Item>
                                    )}
                                />
                            ) : (
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    description="Your cart is empty"
                                />
                            )}
                        </Card>
                    </Col>
                </Row>
            )}

            <Modal
                title="Remove Item"
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                okText="Yes, Remove"
                cancelText="Cancel"
            >
                <p>Are you sure you want to remove {cartItems[selectedItemIndex]?.name} from your cart?</p>
            </Modal>
        </div>
    );
}
