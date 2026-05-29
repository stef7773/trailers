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
        
        /* Para debug - mostrar información de estado */
        .debug {
            margin-top: 20px;
            padding: 10px;
            background: #1a1a1a;
            border-radius: 8px;
            font-size: 12px;
            color: #0f0;
            font-family: monospace;
            word-break: break-all;
        }
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
        <a class="btn btn-store" id="btnStore" href="${playStore}">
            📲 Descargar Educare AI
        </a>
    </div>
    <div class="debug" id="debugInfo">
        Intentando abrir app automáticamente...<br>
    </div>
    <script>
        var debugDiv = document.getElementById('debugInfo');
        var btnApp = document.getElementById('btnApp');
        var btnStore = document.getElementById('btnStore');
        var appOpened = false;
        var timeout;
        
        function addDebug(msg) {
            debugDiv.innerHTML += msg + '<br>';
            console.log(msg);
        }
        
        addDebug('Script iniciado - Video ID: ${videoId}');
        addDebug('Intent URL: ${intentUrl.substring(0, 100)}...');
        
        // Múltiples métodos para detectar que la app se abrió
        
        // 1. Evento blur (pérdida de foco)
        window.addEventListener('blur', function() {
            if (!appOpened) {
                appOpened = true;
                addDebug('✅ blur detectado - La app se abrió!');
                clearTimeout(timeout);
            }
        });
        
        // 2. Evento pagehide (página oculta)
        window.addEventListener('pagehide', function() {
            if (!appOpened) {
                appOpened = true;
                addDebug('✅ pagehide detectado - La app se abrió!');
                clearTimeout(timeout);
            }
        });
        
        // 3. Evento visibilitychange (pestaña oculta)
        document.addEventListener('visibilitychange', function() {
            if (document.hidden && !appOpened) {
                appOpened = true;
                addDebug('✅ visibilitychange - Pestaña oculta, app abierta!');
                clearTimeout(timeout);
            }
        });
        
        // Intentar abrir la app con múltiples métodos
        addDebug('Intentando abrir con window.location...');
        window.location.href = "${intentUrl}";
        
        // También intentar con iframe silencioso
        var iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = "${intentUrl}";
        document.body.appendChild(iframe);
        addDebug('Iframe creado para intent adicional');
        
        // Timeout: si después de 3 segundos no se detectó apertura
        timeout = setTimeout(function() {
            if (!appOpened) {
                addDebug('❌ TIMEOUT (3 segundos) - No se detectó apertura');
                addDebug('La app NO está instalada o hubo un error');
                addDebug('Ocultando botón rojo, mostrando solo botón verde');
                btnApp.style.display = 'none';
                addDebug('✅ Solo botón verde visible para descarga');
            } else {
                addDebug('App abierta correctamente, ambos botones visibles');
            }
        }, 3000);
        
        // Si el usuario regresa a la página (solo si falló)
        window.addEventListener('pageshow', function(event) {
            addDebug('pageshow event - persisted: ' + event.persisted);
            if (event.persisted && !appOpened) {
                addDebug('⚠️ Usuario regresó a la página - la app no se abrió');
                btnApp.style.display = 'none';
                addDebug('Botón rojo ocultado');
            }
        });
        
        addDebug('Esperando detección de apertura de app...');
    </script>
</body>
</html>`;

    return {
        statusCode: 200,
        headers: { "Content-Type": "text/html" },
        body: html
    };
};
