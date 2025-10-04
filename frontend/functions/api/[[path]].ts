interface Env {
  SDA_API: Fetcher; // or `any`
}

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  return env.SDA_API.fetch(request);
};
