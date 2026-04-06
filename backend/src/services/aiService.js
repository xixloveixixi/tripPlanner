import axios from 'axios';
import config from '../config/index.js';

/**
 * 调用 DeepSeek API
 * @param {string} systemPrompt - 系统提示词
 * @param {string} userPrompt - 用户提示词
 * @returns {Promise<Object>} - 解析后的 AI 响应
 */
export async function callDeepSeek(systemPrompt, userPrompt) {
  try {
    const response = await axios.post(
      `${config.deepseek.baseUrl}/v1/chat/completions`,
      {
        model: config.deepseek.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2000
      },
      {
        headers: {
          'Authorization': `Bearer ${config.deepseek.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    let content = response.data.choices[0].message.content;

    // 尝试解析 JSON（处理 markdown 代码块的情况）
    try {
      // 如果内容被包裹在 ```json ... ``` 中，提取出来
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        content = jsonMatch[1];
      }
      // 如果内容被包裹在 ``` ... ``` 中
      else if (content.startsWith('```') && content.endsWith('```')) {
        content = content.replace(/```\w*\n?/g, '').trim();
      }

      // 解析 JSON
      return JSON.parse(content);
    } catch (e) {
      console.error('JSON Parse Error:', e.message);
      // 如果解析失败，返回原始内容
      return { raw: content };
    }
  } catch (error) {
    console.error('DeepSeek API Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error?.message || 'AI service error');
  }
}