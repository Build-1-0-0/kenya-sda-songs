import { useState } from 'react';

export default function Edit() {
  const [pass, setPass] = useState('');
  const [song, setSong] = useState({ id: '', title: '', youtubeId: '', description: '', lyrics: '', thumbnail: '', category: '', date: new Date().toISOString().split('T')[0] });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/songs', {
      method: 'POST',
      headers: { 'X-Editor-Pass': pass, 'Content-Type': 'application/json' },
      body: JSON.stringify(song),
    });
    alert(res.ok ? 'Song added!' : 'Error: Check password or data');
  };
  return (
    <form onSubmit={handleSubmit} className="container mx-auto p-4">
      <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Editor Password" className="border p-2 mb-2 w-full" />
      <input value={song.title} onChange={(e) => setSong({ ...song, title: e.target.value })} placeholder="Title" className="border p-2 mb-2 w-full" />
      <input value={song.youtubeId} onChange={(e) => setSong({ ...song, youtubeId: e.target.value })} placeholder="YouTube Video ID" className="border p-2 mb-2 w-full" />
      <textarea value={song.description} onChange={(e) => setSong({ ...song, description: e.target.value })} placeholder="Description" className="border p-2 mb-2 w-full" />
      <textarea value={song.lyrics} onChange={(e) => setSong({ ...song, lyrics: e.target.value })} placeholder="Lyrics" className="border p-2 mb-2 w-full" />
      <input value={song.thumbnail} onChange={(e) => setSong({ ...song, thumbnail: e.target.value })} placeholder="Thumbnail URL" className="border p-2 mb-2 w-full" />
      <input value={song.category} onChange={(e) => setSong({ ...song, category: e.target.value })} placeholder="Category" className="border p-2 mb-2 w-full" />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Song</button>
    </form>
  );
}
