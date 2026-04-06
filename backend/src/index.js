import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import config from './config/index.js';
import routes from './api/routes.js';

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api', routes);

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 启动服务器
app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});