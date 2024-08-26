"use client";
import React, { useEffect, useState } from 'react';
import { getProducts } from '@/utils/api';
import { Col, Row, Spin, Typography } from 'antd';
import ProductCard from './ProductCard';

const { Title } = Typography;

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <Spin tip="Loading products..." />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Title level={2}>Product List</Title>
            <Row gutter={16}>
                {products.length > 0 ? (
                    products.map(product => (
                        <Col span={8} key={product._id}>
                            <ProductCard product={product} />
                        </Col>
                    ))
                ) : (
                    <Col span={24}>
                        <div>No products available.</div>
                    </Col>
                )}
            </Row>
        </div>
    );
}

export default ProductList;
