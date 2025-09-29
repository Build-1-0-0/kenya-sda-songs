import type { PagesFunction } from '@cloudflare/pages';

export const onRequest: PagesFunction = async ({ request }) => {
  const workerUrl = 'https://sda-api.africancontent807.workers.dev' + new URL(request.url).pathname;
  return fetch(workerUrl, {
    method: request.method,
    headers: request.headers,
    redirect: 'follow',
    body: request.body,
  });
};
