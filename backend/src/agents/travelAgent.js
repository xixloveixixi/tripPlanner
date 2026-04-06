import { callDeepSeek } from '../services/aiService.js';

/**
 * 目的地推荐智能体
 * @param {Object} params - 用户偏好
 * @returns {Promise<Object>} - 推荐结果
 */
export async function recommendDestination({ types, budget, season }) {
  const systemPrompt = `你是一位专业的旅行顾问。根据用户的偏好，推荐适合的旅行目的地。`;

  const userPrompt = `
用户偏好：
- 类型：${types.join('、')}
- 预算：${budget}
- 季节：${season}

请返回 3-5 个推荐目的地，每个包含：名称、推荐理由、最佳旅行时间。
请用 JSON 格式返回，格式如下：
{
  "destinations": [
    {"name": "目的地名称", "reason": "推荐理由", "bestTime": "最佳旅行时间"}
  ]
}`;

  const result = await callDeepSeek(systemPrompt, userPrompt);

  // 检查是否有 destinations，如果没有尝试从 raw 中解析
  if (result.destinations) {
    return result;
  }

  // 如果返回的是 raw 字符串，尝试再次解析
  if (result.raw) {
    try {
      return JSON.parse(result.raw);
    } catch {
      return { destinations: [] };
    }
  }

  return { destinations: [] };
}

/**
 * 行程规划智能体
 * @param {Object} params - 行程参数
 * @returns {Promise<Object>} - 行程规划结果
 */
export async function generatePlanning({ destination, days, budget, preferences }) {
  const systemPrompt = `你是一位旅行规划师。请为用户规划详细的行程。`;

  const userPrompt = `
请为用户规划 ${days} 天的 ${destination} 行程。

用户需求：
- 目的地：${destination}
- 天数：${days} 天
- 预算：${budget}
- 偏好：${preferences.join('、') || '无'}

请按天提供详细的行程安排，包含：时间、活动、地点、注意事项。
请用 JSON 格式返回，格式如下：
{
  "destination": "目的地",
  "totalDays": 天数,
  "days": [
    {
      "day": 1,
      "theme": "主题",
      "activities": [
        {"time": "时间", "activity": "活动", "location": "地点", "note": "注意事项"}
      ]
    }
  ]
}`;

  const result = await callDeepSeek(systemPrompt, userPrompt);

  if (result.destination) {
    return result;
  }

  if (result.raw) {
    try {
      return JSON.parse(result.raw);
    } catch {
      return { destination, totalDays: days, days: [] };
    }
  }

  return { destination, totalDays: days, days: [] };
}

/**
 * 攻略摘要智能体
 * @param {Object} params - 摘要参数
 * @returns {Promise<Object>} - 摘要结果
 */
export async function extractSummary({ content }) {
  const systemPrompt = `你是一位旅行攻略专家。请阅读攻略内容并提取关键信息。`;

  const userPrompt = `
请阅读以下旅行攻略内容，提取关键信息：

${content}

请提取以下信息并用 JSON 格式返回：
{
  "topSpots": ["必去景点1", "必去景点2", ...],
  "foods": ["特色美食1", "特色美食2", ...],
  "accommodations": ["住宿推荐1", "住宿推荐2", ...],
  "transport": "交通建议",
  "tips": ["实用tip1", "实用tip2", ...]
}`;

  const result = await callDeepSeek(systemPrompt, userPrompt);

  if (result.topSpots) {
    return result;
  }

  if (result.raw) {
    try {
      return JSON.parse(result.raw);
    } catch {
      return { topSpots: [], foods: [], accommodations: [], transport: '', tips: [] };
    }
  }

  return { topSpots: [], foods: [], accommodations: [], transport: '', tips: [] };
}