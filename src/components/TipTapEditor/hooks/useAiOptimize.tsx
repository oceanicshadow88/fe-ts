import { JSONContent } from '@tiptap/core';
import { useState } from 'react';
import { optimizeContent } from '../../../api/ai/ai';

type AiAction = 'optimizeTicketDescription' | 'optimizeText';

function formatFieldName(key: string): string {
  // 特殊字段处理
  const specialFields: Record<string, string> = {
    url_page: 'URL Page',
    effect_related_functions: 'Effect Related Functions',
    include_pass_test: 'Include Pass Test',
    technical_details: 'Technical Details',
    acceptance_criteria: 'Acceptance Criteria'
  };

  // 如果是特殊字段，直接返回映射值
  if (specialFields[key]) {
    return specialFields[key];
  }

  // 一般字段：将下划线替换为空格，每个单词首字母大写
  return key
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function convertDataToJSONContent(data: any): JSONContent {
  const content: JSONContent[] = [];

  // 添加主标题
  content.push({
    type: 'heading',
    attrs: { level: 1 },
    content: [{ type: 'text', text: 'Feature Requirements' }]
  });

  // 固定顺序：先处理description和url_page
  const priorityFields = ['description', 'url_page'];
  priorityFields.forEach((key) => {
    if (data[key]) {
      // 添加字段标题
      content.push({
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: formatFieldName(key) }]
      });

      // 字符串类型直接显示
      content.push({
        type: 'paragraph',
        content: [{ type: 'text', text: String(data[key]) }]
      });
    }
  });

  // 处理其他字段
  Object.entries(data).forEach(([key, value]) => {
    // 跳过已处理的字段和空值
    if (priorityFields.includes(key) || !value || (Array.isArray(value) && value.length === 0)) {
      return;
    }

    // 添加字段标题
    content.push({
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: formatFieldName(key) }]
    });

    // 处理值：字符串直接显示，数组使用列表
    if (Array.isArray(value)) {
      // 不使用列表，改为每项一个段落，前面加上"• "
      value.forEach((item) => {
        content.push({
          type: 'paragraph',
          content: [{ type: 'text', text: `- ${String(item)}` }]
        });
      });
    } else {
      // 字符串类型直接显示
      content.push({
        type: 'paragraph',
        content: [{ type: 'text', text: String(value) }]
      });
    }
  });

  return { type: 'doc', content };
}

function formatPlainText(data: any): string {
  return typeof data === 'string' ? data : '';
}

export function useAiOptimize() {
  const [isLoading, setIsLoading] = useState(false);

  const optimize = async (
    text: string,
    action: AiAction
  ): Promise<JSONContent | string | undefined> => {
    if (!text.trim() || isLoading) return undefined;
    setIsLoading(true);
    try {
      const response = await optimizeContent({
        content: text,
        action
      });
      if (response.data.success) {
        if (action === 'optimizeTicketDescription') {
          return convertDataToJSONContent(response.data.data);
        }
        if (action === 'optimizeText') {
          return formatPlainText(response.data.data);
        }
      }
      return undefined;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('AI optimization failed:', error);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  return { optimize, isLoading };
}
