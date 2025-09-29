import YouTube from 'react-youtube';

export default function SongCard({ song }) {
  return (
    <div className="border rounded-lg p-4">
      <img src={song.thumbnail} alt={song.title} className="w-full h-32 object-cover rounded" />
      <h3 className="text-lg font-semibold">{song.title}</h3>
      <p className="text-sm">{song.description.slice(0, 50)}...</p>
      <YouTube videoId={song.youtubeId} opts={{ width: '100%', height: '150' }} />
    </div>
  );
}
