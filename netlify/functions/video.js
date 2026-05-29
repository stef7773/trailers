exports.handler = async function(event) {
    const videoId = event.queryStringParameters?.id || "";
    
    if (!videoId) {
        return {
            statusCode: 302,
            headers: { Location: "https://m.youtube.com" }
        };
    }

    const thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    const title = "Mira este tráiler en Educare AI 🎬";
    const desc  = "Toca para ver el video en la app Educare AI";
    const url   = `https://relaxed-seahorse-65460e.netlify.app/video?id=${videoId}`;
    const playStore = `https://play.google.com/store/apps/details?id=com.educareai.app&hl=es_419`;

    const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta property="og:type"         content="video.other">
    <meta property="og:title"        content="${title}">
    <meta property="og:description"  content="${desc}">
    <meta property="og:image"        content="${thumb}">
    <meta property="og:image:width"  content="1280">
    <meta property="og:image:height" content="720">
    <meta property="og:url"          content="${url}">
    <meta name="twitter:card"        content="summary_large_image">
    <meta name="twitter:title"       content="${title}">
    <meta name="twitter:image"       content="${thumb}">
    <style>
        body { font-family: sans-serif; text-align: center; padding: 40px 20px; background: #0f0f0f; color: white; }
        img { width: 100%; max-width: 400px; border-radius: 12px; margin: 20px auto; display: block; }
        .btn { display: inline-block; margin: 10px; padding: 14px 28px; border-radius: 24px; font-size: 16px; font-weight: bold; text-decoration: none; }
        .btn-app { background: #ff0000; color: white; }
        .btn-store { background: #01875f; color: white; }
    </style>
</head>
<body>
    <h2>${title}</h2>
    <img src="${thumb}" alt="thumbnail">
    <p>${desc}</p>
    <a class="btn btn-app"   id="btnApp"   href="intent://video?id=${videoId}#Intent;scheme=https;host=relaxed-seahorse-65460e.netlify.app;package=com.educareai.app;S.browser_fallback_url=${encodeURIComponent(playStore)};end">
        🎬 Abrir en Educare AI
    </a>
    <br>
    <a class="btn btn-store" href="${playStore}">
        📲 Descargar Educare AI
    </a>

    <script>
        // Intentar abrir la app automáticamente
        var appUrl = "intent://video?id=${videoId}#Intent;scheme=https;host=relaxed-seahorse-65460e.netlify.app;package=com.educareai.app;S.browser_fallback_url=${encodeURIComponent(playStore)};end";
        
        var timeout = setTimeout(function() {
            // Si después de 2s no abrió la app → mostrar botones
            document.getElementById('btnApp').style.display = 'none';
        }, 2000);

        window.location.href = appUrl;

        window.addEventListener('blur', function() {
            clearTimeout(timeout);
        });
    </script>
</body>
</html>`;

    return {
        statusCode: 200,
        headers: { "Content-Type": "text/html" },
        body: html
    };
};
