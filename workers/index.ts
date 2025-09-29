import { KVNamespace } from '@cloudflare/workers-types';

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

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    // List all songs
    if (url.pathname === '/api/songs' && request.method === 'GET') {
      const songs = await env.SONGS.list();
      return Response.json(await Promise.all(songs.keys.map(async k => JSON.parse(await env.SONGS.get(k.name)))));
    }
    // Get single song
    if (url.pathname.startsWith('/api/songs/') && request.method === 'GET') {
      const id = url.pathname.split('/').pop();
      const song = await env.SONGS.get(`song-${id}`);
      return song ? Response.json(JSON.parse(song)) : new Response('Not Found', { status: 404 });
    }
    // Editor: Add song
    if (url.pathname === '/api/songs' && request.method === 'POST') {
      if (request.headers.get('X-Editor-Pass') !== env.EDITOR_PASSWORD) {
        return new Response('Unauthorized', { status: 401 });
      }
      const song = await request.json() as Song;
      await env.SONGS.put(`song-${song.id}`, JSON.stringify(song));
      return Response.json({ success: true });
    }
    return new Response('Not Found', { status: 404 });
  },
} satisfies ExportedHandler<Env>;
