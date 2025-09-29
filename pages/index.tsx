import { useEffect, useState } from 'react';
import SongCard from '../components/SongCard';

export default function Home() {
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    fetch('/api/songs')
      .then(res => res.json())
      .then(setSongs);
  }, []);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Kenyan SDA Songs</h1>
      <div className="grid grid-cols-2 gap-4">
        {songs.map(song => <SongCard key={song.id} song={song} />)}
      </div>
    </div>
  );
}
