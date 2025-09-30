export async function onRequest({ request }) {
  const workerUrl = 'https://sda-api.africancontent807.workers.dev' + new URL(request.url).pathname;
  const headers = {};
  for (const [key, value] of request.headers) {
    headers[key] = value;
  }
  return fetch(workerUrl, {
    method: request.method,
    headers,
    body: request.body,
    redirect: 'follow',
  });
}
