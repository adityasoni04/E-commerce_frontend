// app/components/Layout/Layout.js
import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

const AppLayout = ({ children }) => {
    return (
        <Layout>
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">Home</Menu.Item>
                    <Menu.Item key="2">Products</Menu.Item>
                    <Menu.Item key="3">Dashboard</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div style={{ padding: 24, minHeight: 380 }}>{children}</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>©2024 Your Store</Footer>
        </Layout>
    );
};

export default AppLayout;
