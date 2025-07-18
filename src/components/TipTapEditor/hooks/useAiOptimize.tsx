import { useState } from 'react';
import { optimizeContent } from '../../../api/ai/ai';

type AiAction = 'optimizeTicketDescription' | 'optimizeText';

function formatStructuredData(data: any): string {
  return `
<div>
  <h3>include_pass_test</h3>
  <p>${data.include_pass_test}</p>
</div>

<div>
  <h3>url_page</h3>
  <p>${data.url_page}</p>
</div>

<div>
  <h3>limitation</h3>
  <p>${data.limitation}</p>
</div>

<div>
  <h3>effect_related_functions</h3>
  <p>${data.effect_related_functions}</p>
</div>

<div>
  <h3>technical_details</h3>
  <p>${data.technical_details}</p>
</div>

<div>
  <h3>description</h3>
  <p>${data.description}</p>
</div>

<div>
  <h3>acceptance_criteria</h3>
  ${data.acceptance_criteria
    .map(
      (criteria: any) => `
  <div>
    <p><strong>GIVEN:</strong> ${criteria.given}</p>
    <p><strong>WHEN:</strong> ${criteria.when}</p>
    <p><strong>THEN:</strong> ${criteria.then}</p>
    ${criteria.and ? `<p><strong>AND:</strong> ${criteria.and}</p>` : ''}
  </div>
  `
    )
    .join('')}
</div>
  `.trim();
}

export function useAiOptimize() {
  const [isLoading, setIsLoading] = useState(false);

  const optimize = async (text: string, action: AiAction): Promise<string | undefined> => {
    if (!text.trim() || isLoading) return undefined;
    setIsLoading(true);
    try {
      const response = await optimizeContent({
        content: text,
        action
      });
      if (response.data.success) {
        if (action === 'optimizeText') {
          return response.data.data as string;
        }
        // optimizeTicketDescription
        const data = response.data.data as any;
        return formatStructuredData(data);
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
