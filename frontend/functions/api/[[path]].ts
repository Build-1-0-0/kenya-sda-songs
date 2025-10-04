export async function onRequest({ request, env }) {
  return env.SDA_API.fetch(request);
}
