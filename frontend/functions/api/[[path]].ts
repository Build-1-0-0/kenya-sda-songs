import type { PagesFunction } from '@cloudflare/workers-types';

export const onRequest: PagesFunction = async ({ request }) => {
  const workerUrl = 'https://sda-api.africancontent807.workers.dev' + new URL(request.url).pathname;
  return fetch(workerUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });
};
