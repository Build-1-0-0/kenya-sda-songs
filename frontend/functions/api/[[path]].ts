export async function onRequest(context) {
  const response = await fetch("https://sda-api.africancontent807.workers.dev/songs.json");
  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
