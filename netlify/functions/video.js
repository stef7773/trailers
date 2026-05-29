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
    
    // Usar el deep link NORMAL (https) en lugar de intent://
    const deepLink = url;

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
        html { font-size: 16px; }
        body {
            font-family: -apple-system, sans-serif;
            text-align: center;
            padding: 24px 16px;
            background: #0f0f0f;
            color: white;
            min-height: 100vh;
            width: 100%;
        }
        h2 {
            font-size: 5vw;
            min-font-size: 20px;
            margin-bottom: 16px;
            line-height: 1.3;
            padding: 0 8px;
        }
        img {
            width: 92vw;
            max-width: 92vw;
            border-radius: 12px;
            margin: 0 auto 20px;
            display: block;
            box-shadow: 0 8px 24px rgba(0,0,0,0.5);
        }
        p {
            font-size: 4vw;
            color: #aaa;
            margin-bottom: 28px;
            padding: 0 8px;
        }
        .botones {
            display: flex;
            flex-direction: column;
            gap: 14px;
            width: 92vw;
            margin: 0 auto;
        }
        .btn {
            display: block;
            width: 100%;
            padding: 5vw 0;
            border-radius: 50px;
            font-size: 5vw;
            font-weight: bold;
            text-decoration: none;
            letter-spacing: 0.5px;
        }
        .btn-app   { background: #ff0000; color: white; }
        .btn-store { background: #01875f; color: white; }
        
        .debug {
            margin-top: 20px;
            padding: 10px;
            background: #1a1a1a;
            border-radius: 8px;
            font-size: 11px;
            color: #0f0;
            font-family: monospace;
            text-align: left;
            word-break: break-all;
        }
    </style>
</head>
<body>
    <h2>${title}</h2>
    <img src="${thumb}" alt="thumbnail">
    <p>${desc}</p>
    <div class="botones">
        <a class="btn btn-app" id="btnApp" href="${deepLink}">
            🎬 Abrir en Educare AI
        </a>
        <a class="btn btn-store" href="${playStore}">
            📲 Descargar Educare AI
        </a>
    </div>
    <div class="debug" id="debugInfo">
        Estado: Iniciando...<br>
        Deep Link: ${deepLink}<br>
    </div>
    <script>
        var debugDiv = document.getElementById('debugInfo');
        var btnApp = document.getElementById('btnApp');
        
        function log(msg) {
            debugDiv.innerHTML += msg + '<br>';
            console.log(msg);
        }
        
        log('Script iniciado - Video ID: ${videoId}');
        log('Deep Link URL: ${deepLink}');
        
        // Intentar abrir la app automáticamente con el deep link
        log('Intentando abrir app automáticamente...');
        window.location.href = "${deepLink}";
        log('Redirección ejecutada');
        
        // Detectar si la app se abrió
        var appOpened = false;
        
        window.addEventListener('blur', function() {
            if (!appOpened) {
                appOpened = true;
                log('✅ EVENTO blur: La app se abrió!');
            }
        });
        
        window.addEventListener('pagehide', function() {
            if (!appOpened) {
                appOpened = true;
                log('✅ EVENTO pagehide: La app se abrió!');
            }
        });
        
        document.addEventListener('visibilitychange', function() {
            if (document.hidden && !appOpened) {
                appOpened = true;
                log('✅ EVENTO visibilitychange: La app se abrió!');
            }
        });
        
        // Timeout solo para informar
        setTimeout(function() {
            if (appOpened) {
                log('✅ Verificación: App abierta correctamente');
            } else {
                log('⚠️ Verificación: No se detectó apertura');
                log('💡 El usuario debe tocar el botón ROJO manualmente');
            }
            log('🔴 Botón ROJO: ${deepLink}');
            log('🟢 Botón VERDE: ${playStore}');
        }, 3000);
    </script>
</body>
</html>`;

    return {
        statusCode: 200,
        headers: { "Content-Type": "text/html" },
        body: html
    };
};
