export async function onRequest({ request }) {
  const workerUrl = 'https://sda-api.africancontent807.workers.dev' + new URL(request.url).pathname;
  return fetch(workerUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });
}
