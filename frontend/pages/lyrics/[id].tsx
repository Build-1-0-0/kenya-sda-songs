import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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

export default function Lyrics() {
  const router = useRouter();
  const { id } = router.query;
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const fetchSongs = async () => {
    try {
      const res = await fetch('https://sda-api.africancontent807.workers.dev/api/songs');
      if (!res.ok) throw new Error('Failed to fetch songs');
      const data: Song[] = await res.json();
      setSongs(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchSongs();
}, []);
  
  if (loading) return <div className="container mx-auto p-4">Loading song...</div>;
  if (error) return <div className="container mx-auto p-4">Error: {error}</div>;
  if (!song) return <div className="container mx-auto p-4">Song not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{song.title}</h1>
      <pre className="whitespace-pre-wrap">{song.lyrics}</pre>
    </div>
  );
}
