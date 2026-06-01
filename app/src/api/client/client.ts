import { z } from 'zod';

export const getApiBase = (): string => import.meta.env.VITE_API_URL ?? '/api';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
}

async function request<TResponse>(
  url: string,
  schema: z.ZodType<TResponse>,
  options: RequestOptions = {},
): Promise<TResponse> {
  const { method = 'GET', body, headers = {} } = options;

  const response = await fetch(`${getApiBase()}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => response.statusText);
    throw new Error(errorText || `HTTP ${response.status}`);
  }

  const json = await response.json();
  return schema.parse(json);
}

export const apiClient = {
  get: <TResponse>(url: string, schema: z.ZodType<TResponse>, headers?: Record<string, string>) =>
    request(url, schema, { method: 'GET', headers }),

  post: <TResponse, TBody = unknown>(url: string, schema: z.ZodType<TResponse>, body: TBody, headers?: Record<string, string>) =>
    request(url, schema, { method: 'POST', body, headers }),

  put: <TResponse, TBody = unknown>(url: string, schema: z.ZodType<TResponse>, body: TBody, headers?: Record<string, string>) =>
    request(url, schema, { method: 'PUT', body, headers }),

  patch: <TResponse, TBody = unknown>(url: string, schema: z.ZodType<TResponse>, body: TBody, headers?: Record<string, string>) =>
    request(url, schema, { method: 'PATCH', body, headers }),

  delete: <TResponse>(url: string, schema: z.ZodType<TResponse>, headers?: Record<string, string>) =>
    request(url, schema, { method: 'DELETE', headers }),
};
