# 智能旅行规划助手 - 设计文档

## 1. 项目概述

### 项目背景
- **用户痛点**: 喜欢旅行但在小红书等平台搜索攻略浪费时间
- **目标用户**: 热爱旅行、希望高效规划行程的用户
- **项目定位**: AI 驱动的旅行规划工具，帮助用户快速完成目的地推荐、行程规划和攻略摘要

### 核心功能
1. **目的地推荐** — 根据用户偏好（类型、预算、季节）推荐适合的旅行目的地
2. **行程规划** — 输入目的地和天数，AI 生成详细的每日行程安排
3. **攻略摘要** — 粘贴长篇攻略，AI 自动提取关键信息
4. **地图展示** — 在地图上可视化标注行程中的景点（第二阶段）
5. **PDF 导出** — 一键生成可下载的行程攻略 PDF（第二阶段）

---

## 2. 技术架构

### 技术栈
- **前端**: React + Vite
- **后端**: Node.js + Express
- **AI**: DeepSeek API
- **地图**: Leaflet + OpenStreetMap（开源免费）
- **PDF**: jsPDF

### 目录结构

```
helloagents-trip-planner/
├── backend/                    # 后端代码 (Node.js)
│   ├── src/
│   │   ├── agents/             # 智能体实现
│   │   │   └── travelAgent.js  # 旅行智能体
│   │   ├── api/                # API 路由
│   │   │   └── routes.js       # 路由定义
│   │   ├── services/          # 服务层
│   │   │   ├── aiService.js    # AI 调用服务
│   │   │   └── pdfService.js   # PDF 生成服务
│   │   ├── config/             # 配置文件
│   │   │   └── index.js        # 环境配置
│   │   └── index.js            # 入口文件
│   └── package.json
│
└── frontend/                   # 前端代码 (React)
    ├── src/
    │   ├── views/              # 页面组件
    │   │   ├── Home.jsx        # 首页
    │   │   ├── Destination.jsx # 目的地推荐页
    │   │   ├── Planning.jsx   # 行程规划页
    │   │   └── Summary.jsx    # 攻略摘要页
    │   ├── services/          # API 服务
    │   │   └── api.js          # API 调用封装
    │   ├── types/             # 类型定义
    │   │   └── index.js        # TypeScript 类型（可选）
    │   ├── router/            # 路由配置
    │   │   └── index.jsx       # 路由定义
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

---

## 3. API 设计

### 后端 API 列表

| 方法 | 路径 | 功能 |
|------|------|------|
| POST | /api/destination/recommend | 目的地推荐 |
| POST | /api/planning/generate | 生成行程规划 |
| POST | /api/summary/extract | 攻略摘要提取 |
| POST | /api/export/pdf | 生成 PDF |

### 请求/响应示例

**POST /api/destination/recommend**
```json
// Request
{
  "preferences": ["海岛", "美食"],
  "budget": "中等",
  "season": "夏季"
}

// Response
{
  "destinations": [
    { "name": "三亚", "reason": "适合海岛度假...", "bestTime": "10月-次年3月" },
    { "name": "厦门", "reason": "美食与海景...", "bestTime": "全年" }
  ]
}
```

---

## 4. 前端页面设计

### 页面结构

1. **首页 (Home)** — 功能入口，选择想要使用的功能
2. **目的地推荐页 (Destination)** — 选择偏好，获取推荐结果
3. **行程规划页 (Planning)** — 输入目的地和天数，获取详细行程
4. **攻略摘要页 (Summary)** — 粘贴攻略文本，获取摘要结果

### 交互设计
- 简洁的卡片式布局
- 清晰的步骤引导
- 加载状态展示（流式输出效果）
- 错误提示和重试机制

---

## 5. AI Prompt 设计

### 目的地推荐 Prompt
```
你是一位专业的旅行顾问。根据用户的偏好，推荐适合的旅行目的地。

用户偏好：
- 类型：{types}
- 预算：{budget}
- 季节：{season}

请返回 3-5 个推荐目的地，每个包含：名称、推荐理由、最佳旅行时间。
```

### 行程规划 Prompt
```
你是一位旅行规划师。请为用户规划 {days} 天的 {destination} 行程。

用户需求：
- 目的地：{destination}
- 天数：{days} 天
- 预算：{budget}
- 偏好：{preferences}

请按天提供详细的行程安排，包含：时间、活动、地点、注意事项。
```

### 攻略摘要 Prompt
```
请阅读以下旅行攻略内容，提取关键信息：

{content}

请提取：
1. 必去景点（TOP 5）
2. 特色美食
3. 住宿推荐
4. 交通建议
5. 实用 Tips
```

---

## 6. 开发计划

### 第一阶段（基础版）
- [ ] 项目初始化（前后端骨架）
- [ ] 基础 API 路由搭建
- [ ] DeepSeek API 集成
- [ ] 首页和目的地推荐功能
- [ ] 行程规划功能
- [ ] 攻略摘要功能

### 第二阶段（进阶版）
- [ ] 地图展示功能
- [ ] PDF 导出功能
- [ ] 响应式 UI 优化
- [ ] 错误处理和加载状态

---

## 7. 验收标准

### 功能验收
- [ ] 用户可以选择偏好并获取目的地推荐
- [ ] 用户可以输入目的地和天数获取详细行程
- [ ] 用户可以粘贴攻略文本获取摘要
- [ ] 地图可以展示行程中的景点位置
- [ ] 用户可以下载 PDF 格式的行程攻略

### 技术验收
- [ ] 前端页面加载时间 < 2s
- [ ] API 响应时间 < 5s（AI 调用除外）
- [ ] 支持移动端响应式布局
- [ ] 关键操作有错误提示

---

## 8. 配置说明

### 环境变量 (.env)
```
# 后端
DEEPSEEK_API_KEY=your_api_key
DEEPSEEK_BASE_URL=https://api.deepseek.com
PORT=3001

# 前端（可选）
VITE_API_URL=http://localhost:3001
```

---

*文档创建时间: 2026-04-06*