"use client";
import { Card, Button, notification } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { FaStar } from 'react-icons/fa';
import './product.css';

export default function ProductCard({ product }) {

    const handleAddToCart = () => {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

        if (!isAuthenticated) {
            notification.info({
                message: 'Login Required',
                description: 'Please log in to add items to your cart.',
                duration: 2,
            });
            return;
        }
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.push(product);

        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        const event = new Event('cartUpdated');
        window.dispatchEvent(event);

        notification.success({
            message: 'Item added to cart',
            description: `Product ${product.name} has been added to your cart.`,
            duration: 2,
        });
    };

    return (
        <div className='productCard'>
            <Card
                title={<div className='cardTitle'>{product.name}</div>}
                cover={
                    <img
                        alt={product.name}
                        src={product.image}
                        className='cardImage'
                    />
                }
                actions={[
                    <Button
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </Button>,
                ]}
                style={{
                    marginBottom: '21px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)'
                }}
            >
                <p className='cardDescription'><b>{product.description}</b></p>
                <h2 className='cardPrice'><strong>Rs.{product.price}</strong></h2>
                <div className='productRating'>
                    {[...Array(Math.floor(product.rating))].map((_, index) => (
                        <FaStar key={index} color="#ffd700" />
                    ))}
                    {product.rating % 1 !== 0 &&
                        <FaStar key="half" color="#ffd700" style={{ position: 'relative', left: '-10px' }} />
                    }
                    {[...Array(5 - Math.ceil(product.rating))].map((_, index) => (
                        <FaStar key={index + Math.floor(product.rating)} color="#e0e0e0" />
                    ))}
                </div>
                <div className='productSales'>
                    <i>{product.totalSales} units sold</i>
                </div>
            </Card>
        </div>
    );
}
