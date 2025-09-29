import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Lyrics() {
  const router = useRouter();
  const { id } = router.query;
  const [song, setSong] = useState(null);
  useEffect(() => {
    if (id) {
      fetch(`/api/songs/${id}`)
        .then(res => res.json())
        .then(setSong);
    }
  }, [id]);
  if (!song) return <div>Loading...</div>;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{song.title}</h1>
      <pre className="whitespace-pre-wrap">{song.lyrics}</pre>
    </div>
  );
}
