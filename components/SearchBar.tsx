import { useState } from 'react';
import Fuse from 'fuse.js';
import SongCard from './SongCard';

export default function SearchBar({ songs }) {
  const [query, setQuery] = useState('');
  const fuse = new Fuse(songs, { keys: ['title', 'description', 'lyrics'] });
  const results = query ? fuse.search(query).map(r => r.item) : songs;
  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search SDA songs..."
        className="border p-2 w-full mb-4"
      />
      <div className="grid grid-cols-2 gap-4">
        {results.map(song => <SongCard key={song.id} song={song} />)}
      </div>
    </div>
  );
}
