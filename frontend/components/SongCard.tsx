import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import YouTube only on client side
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
  return (
    <Link href={`/lyrics/${song.id}`} className="block hover:shadow-lg transition-shadow">
      <div className="border rounded-lg p-4 bg-white shadow-md hover:shadow-xl">
        <img
          src={song.thumbnail}
          alt={song.title}
          className="w-full h-48 object-cover rounded-lg mb-2"
        />
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{song.title}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{song.description}</p>
        <p className="text-xs text-gray-400 mb-2">
          Category: {song.category} | {song.date}
        </p>

        {/* YouTube embed */}
        <div className="aspect-video">
          <YouTube
            videoId={song.youtubeId}
            opts={{ width: '100%', height: '100%', playerVars: { rel: 0 } }}
          />
        </div>
      </div>
    </Link>
  );
}
