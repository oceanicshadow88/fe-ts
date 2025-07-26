import { JSONContent } from '@tiptap/core';
import { useState } from 'react';
import { optimizeContent } from '../../../api/ai/ai';

type AiAction = 'optimizeTicketDescription' | 'optimizeText';

function formatFieldName(key: string): string {
  const specialFields: Record<string, string> = {
    url_page: 'URL Page',
    effect_related_functions: 'Effect Related Functions',
    include_pass_test: 'Include Pass Test',
    technical_details: 'Technical Details',
    acceptance_criteria: 'Acceptance Criteria'
  };

  if (specialFields[key]) {
    return specialFields[key];
  }

  return key
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function convertDataToJSONContent(data: any): JSONContent {
  const content: JSONContent[] = [];

  content.push({
    type: 'heading',
    attrs: { level: 1 },
    content: [{ type: 'text', text: 'Feature Requirements' }]
  });

  const priorityFields = ['description', 'url_page'];
  priorityFields.forEach((key) => {
    if (data[key]) {
      content.push({
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: formatFieldName(key) }]
      });

      content.push({
        type: 'paragraph',
        content: [{ type: 'text', text: String(data[key]) }]
      });
    }
  });

  Object.entries(data).forEach(([key, value]) => {
    if (priorityFields.includes(key) || !value || (Array.isArray(value) && value.length === 0)) {
      return;
    }

    content.push({
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: formatFieldName(key) }]
    });

    if (Array.isArray(value)) {
      value.forEach((item) => {
        content.push({
          type: 'paragraph',
          content: [{ type: 'text', text: `- ${String(item)}` }]
        });
      });
    } else {
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
