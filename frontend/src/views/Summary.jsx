import { useState } from 'react';
import { Card, Input, Typography, Spin, List, message } from 'antd';
import { EnvironmentOutlined, CoffeeOutlined, HomeOutlined, CarOutlined, BulbOutlined } from '@ant-design/icons';
import { extractSummary } from '../services/api';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

function Summary() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    if (!content.trim()) {
      message.error('请输入攻略内容');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await extractSummary({ content });
      setResult(data);
    } catch (err) {
      message.error(err.message || '请求失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const renderCard = (icon, title, data, color = '#a5b4fc') => (
    <Card
      style={{
        marginBottom: 16,
        background: '#1e1b4b',
        border: '1px solid #4c1d95',
      }}
    >
      <Paragraph style={{ margin: 0 }}>
        <span style={{ color: '#8b5cf6', marginRight: 8 }}>{icon}</span>
        <Text strong style={{ color: '#e2e8f0' }}>{title}</Text>
      </Paragraph>
      {Array.isArray(data) ? (
        <List
          size="small"
          dataSource={data || []}
          renderItem={(item) => (
            <List.Item style={{ borderBottom: '1px solid #312e81' }}>
              <Text style={{ color }}>{item}</Text>
            </List.Item>
          )}
        />
      ) : (
        <Paragraph style={{ color: '#a5b4fc', marginTop: 8, marginBottom: 0 }}>{data}</Paragraph>
      )}
    </Card>
  );

  return (
    <div>
      <Title level={2} style={{ color: '#e2e8f0', marginBottom: 24 }}>攻略摘要</Title>

      <Card
        style={{
          background: 'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)',
          border: '1px solid #4c1d95',
          marginBottom: 24
        }}
      >
        <div style={{ marginBottom: 20 }}>
          <Text strong style={{ color: '#e2e8f0' }}>粘贴攻略内容</Text>
          <TextArea
            style={{ marginTop: 8 }}
            rows={10}
            placeholder="请粘贴从网上找到的旅行攻略内容..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div
          onClick={handleSubmit}
          style={{
            padding: '12px 24px',
            background: '#8b5cf6',
            borderRadius: 8,
            textAlign: 'center',
            cursor: 'pointer',
            color: '#fff',
            fontSize: 16,
          }}
        >
          {loading ? '提取中...' : '提取关键信息'}
        </div>
      </Card>

      {loading && (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <Spin size="large" />
          <Paragraph style={{ marginTop: 16, color: '#a5b4fc' }}>AI 正在提取关键信息...</Paragraph>
        </div>
      )}

      {result && (
        <>
          {renderCard(<EnvironmentOutlined />, '必去景点', result.topSpots)}
          {renderCard(<CoffeeOutlined />, '特色美食', result.foods)}
          {renderCard(<HomeOutlined />, '住宿推荐', result.accommodations)}
          {renderCard(<CarOutlined />, '交通建议', result.transport)}
          {renderCard(<BulbOutlined />, '实用 Tips', result.tips)}
        </>
      )}
    </div>
  );
}

export default Summary;