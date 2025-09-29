import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';

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
  useEffect(() => {
    fetch('/api/songs')
      .then(res => res.json())
      .then(setSongs);
  }, []);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Kenyan SDA Songs</h1>
      <SearchBar songs={songs} />
      <div className="grid grid-cols-2 gap-4">
        {songs.map(song => (
          <SearchBar songs={[song]} key={song.id} />
        ))}
      </div>
    </div>
  );
}
