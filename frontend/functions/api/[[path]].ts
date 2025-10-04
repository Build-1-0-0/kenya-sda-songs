export const onRequest: PagesFunction = async ({ request, env }) => {
  return env.SDA_API.fetch(request);
};
