"use client"
import CarouselComponent from '../components/Common/Carousel';
import ProductList from '../components/Product/ProductList';
import { Layout } from 'antd';

const { Content } = Layout;

export default function HomePage() {
    return (
        <Layout>
            <Content style={{ padding: '0 50px' }}>
                <h2>StyleShopping</h2>
                <CarouselComponent />
                <ProductList />
            </Content>
        </Layout>
    );
}
