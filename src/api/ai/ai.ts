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
    limitation: Array<string>;
    effect_related_functions: Array<string>;
    technical_details: Array<string>;
    description: Array<string>;
    acceptance_criteria: Array<string>;
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
