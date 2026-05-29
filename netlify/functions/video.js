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
    
    // URL DEEP LINK correcta para tu manifest (Netlify)
    const deepLink = `https://relaxed-seahorse-65460e.netlify.app/video?id=${videoId}`;

    const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
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
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            text-align: center;
            padding: 24px 16px;
            background: #0f0f0f;
            color: white;
            min-height: 100vh;
        }
        h2 {
            font-size: clamp(20px, 5vw, 28px);
            margin-bottom: 16px;
            line-height: 1.3;
        }
        img {
            width: min(92vw, 400px);
            border-radius: 12px;
            margin: 0 auto 20px;
            display: block;
            box-shadow: 0 8px 24px rgba(0,0,0,0.5);
        }
        p {
            font-size: clamp(14px, 4vw, 18px);
            color: #aaa;
            margin-bottom: 28px;
        }
        .btn-store {
            display: inline-block;
            background: #01875f;
            color: white;
            padding: clamp(12px, 5vw, 18px) clamp(24px, 8vw, 40px);
            border-radius: 50px;
            font-size: clamp(16px, 5vw, 22px);
            font-weight: bold;
            text-decoration: none;
            letter-spacing: 0.5px;
            transition: transform 0.2s, background 0.2s;
        }
        .btn-store:active {
            transform: scale(0.96);
            background: #016544;
        }
        .hidden {
            display: none;
        }
        .loader {
            margin-top: 30px;
            font-size: 14px;
            color: #666;
        }
    </style>
</head>
<body>
    <h2>${title}</h2>
    <img src="${thumb}" alt="thumbnail" loading="eager">
    <p>${desc}</p>
    <div>
        <a class="btn-store hidden" id="downloadBtn" href="${playStore}">
            📲 Descargar Educare AI
        </a>
    </div>
    <div class="loader" id="loader">Abriendo Educare AI...</div>

    <script>
        (function() {
            var downloadBtn = document.getElementById('downloadBtn');
            var loader = document.getElementById('loader');
            var appOpened = false;
            var timeoutId = null;

            // Función para mostrar el botón de descarga (solo si la app NO está instalada)
            function showDownloadButton() {
                if (!appOpened) {
                    downloadBtn.classList.remove('hidden');
                    loader.textContent = '¿No tienes la app?';
                    if (timeoutId) clearTimeout(timeoutId);
                }
            }

            // Detectar cuando la app se abre (pierde foco la página)
            window.addEventListener('blur', function() {
                appOpened = true;
                if (timeoutId) clearTimeout(timeoutId);
                // La app se abrió, no mostramos nada
            });

            // MÉTODO 1: Intentar abrir con iframe (silencioso)
            var iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = '${deepLink}';
            document.body.appendChild(iframe);

            // MÉTODO 2: También intentar con location.href como respaldo
            setTimeout(function() {
                if (!appOpened) {
                    window.location.href = '${deepLink}';
                }
            }, 100);

            // Si después de 2.5 segundos seguimos aquí → app no instalada
            timeoutId = setTimeout(function() {
                if (!appOpened) {
                    showDownloadButton();
                }
            }, 2500);

            // Si el usuario vuelve a la página (falló la apertura)
            window.addEventListener('pageshow', function(event) {
                if (event.persisted && !appOpened) {
                    showDownloadButton();
                }
            });
        })();
    </script>
</body>
</html>`;

    return {
        statusCode: 200,
        headers: { "Content-Type": "text/html" },
        body: html
    };
};
