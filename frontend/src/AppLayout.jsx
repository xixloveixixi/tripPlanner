import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Typography } from 'antd';
import {
  CompassOutlined,
  CalendarOutlined,
  FileTextOutlined,
  HomeOutlined
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Title } = Typography;

const menuItems = [
  { key: '/', icon: <HomeOutlined />, label: '首页' },
  { key: '/destination', icon: <CompassOutlined />, label: '目的地推荐' },
  { key: '/planning', icon: <CalendarOutlined />, label: '行程规划' },
  { key: '/summary', icon: <FileTextOutlined />, label: '攻略摘要' },
];

function AppLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={220}
        style={{
          background: 'linear-gradient(180deg, #1e1b4b 0%, #312e81 100%)',
          padding: '20px 0',
        }}
      >
        <div style={{ padding: '0 24px', marginBottom: 40 }}>
          <Title level={4} style={{ color: '#a78bfa', margin: 0 }}>
            智能旅行规划
          </Title>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{
            background: 'transparent',
            borderRight: 'none',
            color: '#a5b4fc',
          }}
        />
      </Sider>
      <Layout>
        <Content style={{
          padding: '24px',
          background: '#0f0d23',
          minHeight: '100vh',
        }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;