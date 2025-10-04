'use client';
import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import SongCard from './SongCard';

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

interface SearchBarProps {
  songs: Song[];
}

export default function SearchBar({ songs }: SearchBarProps) {
  const [query, setQuery] = useState('');

  // Memoize Fuse instance to prevent recreation on every keystroke
  const fuse = useMemo(
    () =>
      new Fuse(songs, {
        keys: ['title', 'description', 'lyrics', 'category'],
        threshold: 0.3, // 🔍 Lower = more exact matches
      }),
    [songs]
  );

  const results = query ? fuse.search(query).map(r => r.item) : songs;

  return (
    <div className="container mx-auto p-4">
      {/* Search Input */}
      <div className="relative mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search SDA songs by title, lyrics, or category..."
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <p className="text-center text-gray-500">No songs found matching “{query}”.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {results.map(song => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </div>
  );
}
