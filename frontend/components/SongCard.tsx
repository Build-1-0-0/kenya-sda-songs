'use client';
import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Lazy-load YouTube player (client-side only)
const YouTube = dynamic(() => import('react-youtube'), { ssr: false });

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

interface SongCardProps {
  song: Song;
}

export default function SongCard({ song }: SongCardProps) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow">
      <div className="relative aspect-video cursor-pointer" onClick={() => setShowVideo(true)}>
        {!showVideo ? (
          <>
            {/* Thumbnail preview */}
            <img
              src={song.thumbnail}
              alt={song.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                width="64"
                height="64"
                className="opacity-80"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </>
        ) : (
          // Show video player once clicked
          <YouTube
            videoId={song.youtubeId}
            opts={{
              width: '100%',
              height: '100%',
              playerVars: { autoplay: 1, rel: 0 },
            }}
            className="w-full h-full"
          />
        )}
      </div>

      {/* Song info */}
      <div className="p-4">
        <Link href={`/lyrics/${song.id}`} className="block">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{song.title}</h3>
        </Link>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{song.description}</p>
        <p className="text-xs text-gray-400">
          Category: {song.category} | {song.date}
        </p>
      </div>
    </div>
  );
}
