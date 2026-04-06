import axios from 'axios';

const API_BASE = '/api';

// 目的地推荐
export async function recommendDestination(data) {
  const response = await axios.post(`${API_BASE}/destination/recommend`, data);
  return response.data;
}

// 行程规划
export async function generatePlanning(data) {
  const response = await axios.post(`${API_BASE}/planning/generate`, data);
  return response.data;
}

// 攻略摘要
export async function extractSummary(data) {
  const response = await axios.post(`${API_BASE}/summary/extract`, data);
  return response.data;
}