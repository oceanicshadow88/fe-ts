import axios from 'axios';
import config from '../../config/config';

export interface AiOptimizeRequest {
  content: string;
  action: 'optimizeTicketDescription' | 'optimizeText';
}

export interface AiOptimizeStructuredResponse {
  success: boolean;
  data: {
    include_pass_test: string;
    url_page: string;
    limitation: string;
    effect_related_functions: string;
    technical_details: string;
    description: string;
    acceptance_criteria: Array<{
      given: string;
      when: string;
      then: string;
      and: string;
    }>;
  };
}

export interface AiOptimizeTextResponse {
  success: boolean;
  data: string;
}

export type AiOptimizeResponse = AiOptimizeStructuredResponse | AiOptimizeTextResponse;

export interface AiOptimizeErrorResponse {
  error: string;
}

export function optimizeContent(data: AiOptimizeRequest): Promise<{ data: AiOptimizeResponse }> {
  return axios.post(`${config.apiAddressV2}/ai/optimize`, data);
}
