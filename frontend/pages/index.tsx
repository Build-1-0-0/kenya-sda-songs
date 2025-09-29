import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import SongCard from '../components/SongCard';

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

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/songs')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch songs');
        return res.json();
      })
      .then(data => {
        setSongs(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container mx-auto p-4">Loading...</div>;
  if (error) return <div className="container mx-auto p-4">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Kenyan SDA Songs</h1>
      <SearchBar songs={songs} />
      {songs.length === 0 ? (
        <p>No songs available. Add some in the editor!</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {songs.map(song => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </div>
  );
}
