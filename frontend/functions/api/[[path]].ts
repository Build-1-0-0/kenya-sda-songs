import type { PagesFunction } from '@cloudflare/workers-types';

export const onRequest: PagesFunction = async ({ request }) => {
  const workerUrl = 'https://sda-api.africancontent807.workers.dev' + new URL(request.url).pathname;
  const response = await fetch(workerUrl, {
    method: request.method,
    headers: request.headers as HeadersInit,
    body: request.body,
  });
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers as HeadersInit,
  });
};
