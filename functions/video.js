/**
 * Cloudflare Pages Function: /video
 * Sirve el HTML con Open Graph correcto para que WhatsApp muestre
 * el thumbnail del tráiler al pegar el link.
 *
 * Ruta del archivo: functions/video.js
 * URL que maneja: https://trailers-cql.pages.dev/video?id=XXX
 */

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const videoId = url.searchParams.get('id') || '';

  const thumbUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : 'https://trailers-cql.pages.dev/og-default.jpg';

  const title = videoId
    ? 'Mira este tráiler 🎬 — Educare AI'
    : 'Educare AI Trailers';

  const description = 'Ábrelo en la app y míralo sin anuncios 🚀';

  const pageUrl = `https://trailers-cql.pages.dev/video?id=${videoId}`;

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>

  <!-- Open Graph para WhatsApp / Telegram / Twitter -->
  <meta property="og:type"        content="video.other" />
  <meta property="og:site_name"   content="EduCare AI Trailers" />
  <meta property="og:title"       content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image"       content="${thumbUrl}" />
  <meta property="og:image:width"  content="1280" />
  <meta property="og:image:height" content="720" />
  <meta property="og:url"         content="${pageUrl}" />

  <meta name="twitter:card"        content="summary_large_image" />
  <meta name="twitter:title"       content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image"       content="${thumbUrl}" />

  <!-- Redirigir al index.html que tiene toda la lógica JS -->
  <meta http-equiv="refresh" content="0; url=${pageUrl}" />
  <script>window.location.replace("${pageUrl}");</script>
</head>
<body></body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
