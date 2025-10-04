import { KVNamespace, ExportedHandler, Request } from '@cloudflare/workers-types';

interface Song {
  id: string;
  title: string;
  youtubeId: string;
  description: string;
  lyrics: string;
  thumbnail: string;
  category: string;
  date: string;
}

interface Env {
  SONGS: KVNamespace;
  EDITOR_PASSWORD: string;
}

// Helper: add CORS headers
function withCors(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, X-Editor-Pass");
  return new Response(response.body, { ...response, headers });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle preflight (OPTIONS) requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, X-Editor-Pass",
        },
      });
    }

    // List all songs
    if (url.pathname === "/api/songs" && request.method === "GET") {
      const songs = await env.SONGS.list();
      const results = await Promise.all(
        songs.keys.map(async (k) => {
          const value = await env.SONGS.get(k.name);
          return value ? JSON.parse(value) : null;
        })
      );
      return withCors(Response.json(results.filter((song): song is Song => song !== null)));
    }

    // Get single song
    if (url.pathname.startsWith("/api/songs/") && request.method === "GET") {
      const id = url.pathname.split("/").pop();
      const song = await env.SONGS.get(`song-${id}`);
      return song
        ? withCors(Response.json(JSON.parse(song)))
        : withCors(new Response("Not Found", { status: 404 }));
    }

    // Editor: Add song
    if (url.pathname === "/api/songs" && request.method === "POST") {
      if (request.headers.get("X-Editor-Pass") !== env.EDITOR_PASSWORD) {
        return withCors(new Response("Unauthorized", { status: 401 }));
      }
      const song = (await request.json()) as Song;
      await env.SONGS.put(`song-${song.id}`, JSON.stringify(song));
      return withCors(Response.json({ success: true }));
    }

    // Fallback
    return withCors(new Response("Not Found", { status: 404 }));
  },
} satisfies ExportedHandler<Env>;
