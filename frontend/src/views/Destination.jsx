import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Select, Tag, Typography, Spin, message } from 'antd';
import { recommendDestination } from '../services/api';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

function Destination() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    types: [],
    budget: '中等',
    season: '夏季'
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const typeOptions = ['海岛', '城市', '山景', '美食', '历史文化', '自然风光'];
  const budgetOptions = ['经济', '中等', '豪华'];
  const seasonOptions = ['春季', '夏季', '秋季', '冬季'];

  const handleTypeChange = (type) => {
    const newTypes = formData.types.includes(type)
      ? formData.types.filter(t => t !== type)
      : [...formData.types, type];
    setFormData({ ...formData, types: newTypes });
  };

  const handleGoToPlanning = (destinationName) => {
    // 将目的地和预算存储到 localStorage，供行程规划页面使用
    localStorage.setItem('planningData', JSON.stringify({
      destination: destinationName,
      budget: formData.budget
    }));
    navigate('/planning');
  };

  const handleSubmit = async () => {
    if (formData.types.length === 0) {
      message.error('请至少选择一个目的地类型');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await recommendDestination(formData);
      setResult(data);
    } catch (err) {
      message.error(err.message || '请求失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title level={2} style={{ color: '#e2e8f0', marginBottom: 24 }}>目的地推荐</Title>

      <Card
        style={{
          background: 'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)',
          border: '1px solid #4c1d95',
          marginBottom: 24
        }}
      >
        <div style={{ marginBottom: 20 }}>
          <Text strong style={{ color: '#e2e8f0' }}>目的地类型（可多选）</Text>
          <div style={{ marginTop: 12 }}>
            {typeOptions.map(type => (
              <Tag
                key={type}
                color={formData.types.includes(type) ? '#8b5cf6' : '#4c1d95'}
                style={{ margin: '4px', cursor: 'pointer', padding: '4px 12px', color: formData.types.includes(type) ? '#fff' : '#a5b4fc' }}
                onClick={() => handleTypeChange(type)}
              >
                {type}
              </Tag>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <Text strong style={{ color: '#e2e8f0' }}>预算</Text>
          <Select
            style={{ width: '100%', marginTop: 8 }}
            value={formData.budget}
            onChange={(value) => setFormData({ ...formData, budget: value })}
            popupMatchSelectWidth={false}
          >
            {budgetOptions.map(b => <Option key={b} value={b}>{b}</Option>)}
          </Select>
        </div>

        <div style={{ marginBottom: 20 }}>
          <Text strong style={{ color: '#e2e8f0' }}>出行季节</Text>
          <Select
            style={{ width: '100%', marginTop: 8 }}
            value={formData.season}
            onChange={(value) => setFormData({ ...formData, season: value })}
            popupMatchSelectWidth={false}
          >
            {seasonOptions.map(s => <Option key={s} value={s}>{s}</Option>)}
          </Select>
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
          {loading ? '推荐中...' : '获取推荐'}
        </div>
      </Card>

      {loading && (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <Spin size="large" />
          <Paragraph style={{ marginTop: 16, color: '#a5b4fc' }}>AI 正在为你推荐目的地...</Paragraph>
        </div>
      )}

      {result && result.destinations && result.destinations.length > 0 && (
        <Card
          title={<Title level={4} style={{ color: '#e2e8f0', margin: 0 }}>推荐目的地</Title>}
          style={{ background: 'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)', border: '1px solid #4c1d95' }}
        >
          {result.destinations.map((dest, index) => (
            <Card
              key={index}
              type="inner"
              style={{
                marginBottom: 16,
                background: '#1e1b4b',
                border: '1px solid #4c1d95',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <Title level={5} style={{ color: '#a78bfa', marginBottom: 8 }}>{dest.name}</Title>
                  <Paragraph style={{ color: '#a5b4fc', marginBottom: 8 }}>{dest.reason}</Paragraph>
                  <Text type="secondary" style={{ color: '#6b7280' }}>最佳旅行时间：{dest.bestTime}</Text>
                </div>
                <div
                  onClick={() => handleGoToPlanning(dest.name)}
                  style={{
                    padding: '8px 16px',
                    background: '#8b5cf6',
                    borderRadius: 6,
                    cursor: 'pointer',
                    color: '#fff',
                    fontSize: 14,
                    whiteSpace: 'nowrap',
                    marginLeft: 16,
                  }}
                >
                  生成行程
                </div>
              </div>
            </Card>
          ))}
        </Card>
      )}
    </div>
  );
}

export default Destination;