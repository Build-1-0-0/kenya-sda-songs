import { useRouter } from 'next/router';

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Blog Post: {slug}</h1>
      <p>Sample content for {slug}...</p>
      <div id="disqus_thread"></div>
      <script>
        var disqus_config = function () {
          this.page.url = window.location.href;
          this.page.identifier = `blog-${slug}`;
        };
        (function() {
          var d = document, s = d.createElement('script');
          s.src = 'https://your-site.disqus.com/embed.js';
          d.body.appendChild(s);
        })();
      </script>
    </div>
  );
}
