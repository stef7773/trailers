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
    const intentUrl = `intent://video?id=${videoId}#Intent;scheme=https;host=relaxed-seahorse-65460e.netlify.app;package=com.educareai.app;S.browser_fallback_url=${encodeURIComponent(playStore)};end`;

    const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: sans-serif;
            text-align: center;
            padding: 30px 20px;
            background: #0f0f0f;
            color: white;
            min-height: 100vh;
        }
        h2 {
            font-size: 22px;
            margin-bottom: 20px;
            line-height: 1.3;
        }
        img {
            width: 100%;
            max-width: 500px;
            border-radius: 16px;
            margin: 0 auto 24px;
            display: block;
            box-shadow: 0 8px 24px rgba(0,0,0,0.5);
        }
        p {
            font-size: 16px;
            color: #aaa;
            margin-bottom: 32px;
        }
        .botones {
            display: flex;
            flex-direction: column;
            gap: 16px;
            max-width: 400px;
            margin: 0 auto;
            padding: 0 10px;
        }
        .btn {
            display: block;
            width: 100%;
            padding: 18px 28px;
            border-radius: 50px;
            font-size: 18px;
            font-weight: bold;
            text-decoration: none;
            letter-spacing: 0.5px;
        }
        .btn-app   { background: #ff0000; color: white; }
        .btn-store { background: #01875f; color: white; }
    </style>
</head>
<body>
    <h2>${title}</h2>
    <img src="${thumb}" alt="thumbnail">
    <p>${desc}</p>
    <div class="botones">
        <a class="btn btn-app" id="btnApp" href="${intentUrl}">
            🎬 Abrir en Educare AI
        </a>
        <a class="btn btn-store" href="${playStore}">
            📲 Descargar Educare AI
        </a>
    </div>
    <script>
        var timeout = setTimeout(function() {
            document.getElementById('btnApp').style.display = 'none';
        }, 2000);

        window.location.href = "${intentUrl}";

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
