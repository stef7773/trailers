exports.handler = async function(event) {
    const videoId = event.queryStringParameters?.id || "";
    
    if (!videoId) {
        return {
            statusCode: 302,
            headers: { Location: "https://m.youtube.com" }
        };
    }

    const thumb     = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    const title     = "Mira este tráiler en Educare AI 🎬";
    const desc      = "Toca para ver el video en la app Educare AI";
    const url       = `https://relaxed-seahorse-65460e.netlify.app/video?id=${videoId}`;
    const playStore = `https://play.google.com/store/apps/details?id=com.educareai.app&hl=es_419`;
    
    // Usamos la URL profunda (Deep Link) que coincide con tu Manifest
    const appUrl    = `https://relaxed-seahorse-65460e.netlify.app/video?id=${videoId}`;

    const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>${title}</title>
    <meta property="og:type" content="video.other">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${desc}">
    <meta property="og:image" content="${thumb}">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, sans-serif;
            text-align: center;
            padding: 24px 16px;
            background: #0f0f0f;
            color: white;
            min-height: 100vh;
        }
        h2 { font-size: 1.5rem; margin-bottom: 16px; }
        img { width: 100%; max-width: 500px; border-radius: 12px; margin-bottom: 20px; }
        .botones { display: flex; flex-direction: column; gap: 14px; max-width: 500px; margin: 0 auto; }
        .btn { display: block; width: 100%; padding: 16px; border-radius: 50px; font-weight: bold; text-decoration: none; }
        .btn-app { background: #ff0000; color: white; }
        .btn-store { background: #01875f; color: white; }
    </style>
</head>
<body>
    <h2>${title}</h2>
    <img src="${thumb}" alt="thumbnail">
    <p style="color: #aaa; margin-bottom: 20px;">${desc}</p>
    
    <div class="botones">
        <a class="btn btn-app" href="${appUrl}">🎬 Abrir en Educare AI</a>
        <a class="btn btn-store" href="${playStore}">📲 Descargar Educare AI</a>
    </div>

    <script>
        // Intenta redirigir automáticamente.
        // Si la app está instalada, el sistema Android la abrirá.
        // Si no está instalada, el usuario simplemente se quedará en esta página 
        // y podrá usar los botones manualmente.
        window.location.href = "${appUrl}";
    </script>
</body>
</html>`;

    return {
        statusCode: 200,
        headers: { "Content-Type": "text/html" },
        body: html
    };
};
