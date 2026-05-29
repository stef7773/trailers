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
    const desc = "Toca para ver el video en la app Educare AI";
    const playStore = `https://play.google.com/store/apps/details?id=com.educareai.app&hl=es_419`;
    
    // Deep link para tu app (mismo formato que usas en GitHub)
    const deepLink = `https://relaxed-seahorse-65460e.netlify.app/video?id=${videoId}`;

    const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>${title}</title>
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${desc}">
    <meta property="og:image" content="${thumb}">
    <meta property="og:url" content="${deepLink}">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #0f0f0f;
            color: white;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            max-width: 400px;
            width: 100%;
            text-align: center;
        }
        h1 {
            font-size: 24px;
            margin-bottom: 16px;
        }
        img {
            width: 100%;
            border-radius: 12px;
            margin-bottom: 20px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }
        p {
            color: #aaa;
            margin-bottom: 30px;
            font-size: 16px;
        }
        .btn-download {
            display: inline-block;
            background: #01875f;
            color: white;
            padding: 14px 32px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: bold;
            font-size: 18px;
            transition: transform 0.2s;
        }
        .btn-download:active {
            transform: scale(0.96);
        }
        .hidden {
            display: none;
        }
        .status {
            margin-top: 20px;
            font-size: 14px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>${title}</h1>
        <img src="${thumb}" alt="Video thumbnail">
        <p>${desc}</p>
        <a href="${playStore}" class="btn-download hidden" id="downloadBtn">
            📲 Descargar Educare AI
        </a>
        <div class="status" id="status">
            Abriendo Educare AI...
        </div>
    </div>

    <script>
        (function() {
            const downloadBtn = document.getElementById('downloadBtn');
            const statusDiv = document.getElementById('status');
            let appOpened = false;
            let timeout;

            // FUNCIÓN CLAVE: Intentar abrir con intent:// (evita Chrome)
            function openWithIntent() {
                // Este es el formato que funciona como GitHub
                const intentUrl = \`intent://video?id=${videoId}#Intent;scheme=https;host=relaxed-seahorse-65460e.netlify.app;package=com.educareai.app;S.browser_fallback_url=${encodeURIComponent(playStore)};end\`;
                window.location.href = intentUrl;
            }

            // Si pierde el foco, la app se abrió
            window.addEventListener('blur', function() {
                appOpened = true;
                clearTimeout(timeout);
                statusDiv.textContent = 'Abriendo en Educare AI...';
            });

            // Intentar múltiples veces con intent://
            setTimeout(openWithIntent, 10);
            setTimeout(openWithIntent, 100);
            setTimeout(openWithIntent, 300);

            // Si después de 2 segundos no se abrió, mostrar descarga
            timeout = setTimeout(function() {
                if (!appOpened) {
                    downloadBtn.classList.remove('hidden');
                    statusDiv.textContent = '¿No tienes la app instalada?';
                }
            }, 2000);

            // Si el usuario regresa (falló)
            window.addEventListener('pageshow', function(event) {
                if (event.persisted && !appOpened) {
                    downloadBtn.classList.remove('hidden');
                    statusDiv.textContent = '¿No tienes la app instalada?';
                }
            });
        })();
    </script>
</body>
</html>`;

    return {
        statusCode: 200,
        headers: { 
            "Content-Type": "text/html",
            "Cache-Control": "no-cache, no-store, must-revalidate"
        },
        body: html
    };
};
