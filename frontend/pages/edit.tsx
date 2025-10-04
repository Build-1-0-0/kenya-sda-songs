import { useState } from 'react';

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

interface YouTubeResponse {
  items?: {
    snippet: {
      title: string;
      description: string;
      thumbnails: { high: { url: string } };
    };
  }[];
}

export default function Edit() {
  const [pass, setPass] = useState('');
  const [song, setSong] = useState<Song>({
    id: '',
    title: '',
    youtubeId: '',
    description: '',
    lyrics: '',
    thumbnail: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch YouTube metadata safely
  const fetchYouTubeMeta = async (youtubeId: string) => {
    if (!youtubeId) return;
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${youtubeId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet`
      );

      if (!res.ok) throw new Error('Failed to fetch YouTube data');
      const data: YouTubeResponse = await res.json();

      if (data.items && data.items[0]) {
        const item = data.items[0].snippet;
        setSong(prev => ({
          ...prev,
          title: item.title,
          description: item.description,
          thumbnail: item.thumbnails.high.url,
        }));
      } else {
        setError('No video found for this ID');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Extract YouTube ID and trigger fetch
  const handleYouTubeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setSong(prev => ({ ...prev, youtubeId: value }));

    const idMatch = value.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    );
    if (idMatch) {
      fetchYouTubeMeta(idMatch[1]);
    }
  };

  // ✅ Submit to Cloudflare API with CORS
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!pass) {
      alert('Enter editor password');
      return;
    }
    if (!song.id) song.id = crypto.randomUUID();

    try {
      const res = await fetch('https://sda-api.africancontent807.workers.dev/api/songs', {
        method: 'POST',
        headers: {
          'X-Editor-Pass': pass,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(song),
      });

      if (res.ok) {
        alert('✅ Song added!');
        setSong({
          id: '',
          title: '',
          youtubeId: '',
          description: '',
          lyrics: '',
          thumbnail: '',
          category: '',
          date: new Date().toISOString().split('T')[0],
        });
      } else {
        const errText = await res.text();
        alert(`❌ Error: ${res.status} - ${errText}`);
      }
    } catch (err: any) {
      alert('Network error: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Add SDA Song</h1>

      <input
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder="Editor Password"
        className="border p-2 mb-2 w-full rounded"
        required
      />

      <input
        value={song.youtubeId}
        onChange={handleYouTubeChange}
        placeholder="YouTube Video ID or URL"
        className="border p-2 mb-2 w-full rounded"
        required
      />

      {loading && <p className="text-blue-500 mb-2">Fetching YouTube details...</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        value={song.title}
        onChange={(e) => setSong(prev => ({ ...prev, title: e.target.value }))}
        placeholder="Title (auto-filled from YouTube)"
        className="border p-2 mb-2 w-full rounded"
      />

      <textarea
        value={song.description}
        onChange={(e) => setSong(prev => ({ ...prev, description: e.target.value }))}
        placeholder="Description (auto-filled from YouTube)"
        className="border p-2 mb-2 w-full rounded h-20"
      />

      <input
        value={song.thumbnail}
        onChange={(e) => setSong(prev => ({ ...prev, thumbnail: e.target.value }))}
        placeholder="Thumbnail URL (auto-filled from YouTube)"
        className="border p-2 mb-2 w-full rounded"
      />

      <textarea
        value={song.lyrics}
        onChange={(e) => setSong(prev => ({ ...prev, lyrics: e.target.value }))}
        placeholder="Lyrics (manual entry)"
        className="border p-2 mb-2 w-full rounded h-32"
        required
      />

      <input
        value={song.category}
        onChange={(e) => setSong(prev => ({ ...prev, category: e.target.value }))}
        placeholder="Category (e.g., Hymns)"
        className="border p-2 mb-2 w-full rounded"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Add Song'}
      </button>
    </form>
  );
}
