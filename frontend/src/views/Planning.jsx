import { useState, useEffect } from 'react';
import { Card, Input, Tag, Typography, Spin, Timeline, message } from 'antd';
import { generatePlanning } from '../services/api';

const { Title, Text, Paragraph } = Typography;

function Planning() {
  const [formData, setFormData] = useState({
    destination: '',
    days: 3,
    budget: 5000,
    preferences: []
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // 页面加载时检查是否有预填充的数据
  useEffect(() => {
    const savedData = localStorage.getItem('planningData');
    if (savedData) {
      const { destination, budget } = JSON.parse(savedData);
      setFormData(prev => ({
        ...prev,
        destination,
        budget
      }));
      // 清除 localStorage，避免刷新后重复填充
      localStorage.removeItem('planningData');
    }
  }, []);

  const preferenceOptions = ['美食', '购物', '景点打卡', '休闲放松', '户外运动', '历史文化'];

  const handlePreferenceChange = (pref) => {
    const newPrefs = formData.preferences.includes(pref)
      ? formData.preferences.filter(p => p !== pref)
      : [...formData.preferences, pref];
    setFormData({ ...formData, preferences: newPrefs });
  };

  const handleSubmit = async () => {
    if (!formData.destination) {
      message.error('请输入目的地');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await generatePlanning(formData);
      setResult(data);
    } catch (err) {
      message.error(err.message || '请求失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title level={2} style={{ color: '#e2e8f0', marginBottom: 24 }}>行程规划</Title>

      <Card
        style={{
          background: 'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)',
          border: '1px solid #4c1d95',
          marginBottom: 24
        }}
      >
        <div style={{ marginBottom: 20 }}>
          <Text strong style={{ color: '#e2e8f0' }}>目的地</Text>
          <Input
            style={{ marginTop: 8 }}
            placeholder="例如：三亚、厦门、成都"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <Text strong style={{ color: '#e2e8f0' }}>天数</Text>
          <Input
            type="number"
            style={{ marginTop: 8 }}
            min={1}
            max={30}
            value={formData.days}
            onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) || 1 })}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <Text strong style={{ color: '#e2e8f0' }}>预算（元）</Text>
          <Input
            type="number"
            style={{ marginTop: 8 }}
            placeholder="例如：5000"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) || 0 })}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <Text strong style={{ color: '#e2e8f0' }}>偏好（可多选）</Text>
          <div style={{ marginTop: 12 }}>
            {preferenceOptions.map(pref => (
              <Tag
                key={pref}
                color={formData.preferences.includes(pref) ? '#8b5cf6' : '#4c1d95'}
                style={{ margin: '4px', cursor: 'pointer', padding: '4px 12px', color: formData.preferences.includes(pref) ? '#fff' : '#a5b4fc' }}
                onClick={() => handlePreferenceChange(pref)}
              >
                {pref}
              </Tag>
            ))}
          </div>
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
          {loading ? '规划中...' : '生成行程'}
        </div>
      </Card>

      {loading && (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <Spin size="large" />
          <Paragraph style={{ marginTop: 16, color: '#a5b4fc' }}>AI 正在为你规划行程...</Paragraph>
        </div>
      )}

      {result && (
        <Card
          title={<Title level={4} style={{ color: '#e2e8f0', margin: 0 }}>{result.destination} - {result.totalDays}天行程</Title>}
          style={{ background: 'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)', border: '1px solid #4c1d95' }}
        >
          <Timeline
            items={result.days && result.days.map((day, index) => ({
              dot: <div style={{ background: '#8b5cf6', borderRadius: '50%', width: 12, height: 12 }} />,
              children: (
                <div>
                  <Card size="small" style={{ marginBottom: 8, background: '#1e1b4b', border: '1px solid #4c1d95' }}>
                    <Title level={5} style={{ margin: 0, color: '#a78bfa' }}>第 {day.day} 天 - {day.theme}</Title>
                  </Card>
                  {day.activities && day.activities.map((act, i) => (
                    <div key={i} style={{ marginBottom: 8, padding: '8px 12px', background: '#1e1b4b', borderRadius: 4, border: '1px solid #4c1d95' }}>
                      <Text type="secondary" style={{ color: '#6b7280' }}>{act.time}</Text>
                      <Text style={{ marginLeft: 8, color: '#e2e8f0' }}>{act.activity}</Text>
                      <Text type="secondary" style={{ marginLeft: 8, color: '#a5b4fc' }}>| {act.location}</Text>
                      {act.note && <Text type="warning" style={{ display: 'block', marginTop: 4, fontSize: 12, color: '#f59e0b' }}>{act.note}</Text>}
                    </div>
                  ))}
                </div>
              )
            }))}
          />
        </Card>
      )}
    </div>
  );
}

export default Planning;