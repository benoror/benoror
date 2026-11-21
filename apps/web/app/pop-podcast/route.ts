const PODCAST_PAGE_URL = "https://benoror.bearblog.dev/pop-podcast/";
const PODCAST_RSS_URL = "https://anchor.fm/s/fd81326c/podcast/rss";

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pursuit of Polymathy — Ben Orozco</title>
    <meta name="description" content="Listen to Pursuit of Polymathy, Ben Orozco's podcast about learning across disciplines.">
    <link rel="canonical" href="${PODCAST_PAGE_URL}">
    <link rel="alternate" type="application/rss+xml" title="Pursuit of Polymathy" href="${PODCAST_RSS_URL}">
    <meta property="og:type" content="website">
    <meta property="og:title" content="Pursuit of Polymathy — Ben Orozco">
    <meta property="og:description" content="Listen to Pursuit of Polymathy, Ben Orozco's podcast about learning across disciplines.">
    <meta property="og:url" content="${PODCAST_PAGE_URL}">
    <meta http-equiv="refresh" content="0; url=${PODCAST_PAGE_URL}">
    <script>window.location.replace(${JSON.stringify(PODCAST_PAGE_URL)})</script>
  </head>
  <body>
    <p>Continue to <a href="${PODCAST_PAGE_URL}">Pursuit of Polymathy</a>.</p>
  </body>
</html>
`;

export function GET() {
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
