import { Row, Col, Card, Typography } from 'antd';
import { CompassOutlined, CalendarOutlined, FileTextOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const features = [
  {
    path: '/destination',
    title: '目的地推荐',
    desc: '根据你的偏好推荐适合的旅行目的地',
    icon: <CompassOutlined style={{ fontSize: 40, color: '#8b5cf6' }} />
  },
  {
    path: '/planning',
    title: '行程规划',
    desc: '输入目的地和天数，获取详细行程安排',
    icon: <CalendarOutlined style={{ fontSize: 40, color: '#8b5cf6' }} />
  },
  {
    path: '/summary',
    title: '攻略摘要',
    desc: '粘贴攻略文本，AI 帮你提取关键信息',
    icon: <FileTextOutlined style={{ fontSize: 40, color: '#8b5cf6' }} />
  }
];

function Home() {
  return (
    <div style={{ padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <Title level={1} style={{ color: '#a78bfa', marginBottom: 12 }}>
          智能旅行规划助手
        </Title>
        <Paragraph style={{ fontSize: 18, color: '#a5b4fc' }}>
          AI 驱动，让旅行规划更简单
        </Paragraph>
      </div>

      <Row gutter={[24, 24]} justify="center" style={{ maxWidth: 1000, margin: '0 auto' }}>
        {features.map((feature) => (
          <Col xs={24} sm={12} md={8} key={feature.path}>
            <Link to={feature.path}>
              <Card
                hoverable
                style={{
                  textAlign: 'center',
                  height: '100%',
                  background: 'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)',
                  border: '1px solid #4c1d95',
                }}
              >
                <div style={{ marginBottom: 16 }}>{feature.icon}</div>
                <Title level={4} style={{ color: '#e2e8f0', marginBottom: 8 }}>{feature.title}</Title>
                <Paragraph style={{ color: '#a5b4fc', margin: 0 }}>{feature.desc}</Paragraph>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;