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

    const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta property="og:type"        content="video.other">
    <meta property="og:title"       content="${title}">
    <meta property="og:description" content="${desc}">
    <meta property="og:image"       content="${thumb}">
    <meta property="og:image:width" content="1280">
    <meta property="og:image:height"content="720">
    <meta property="og:url"         content="${url}">
    <meta name="twitter:card"       content="summary_large_image">
    <meta name="twitter:title"      content="${title}">
    <meta name="twitter:image"      content="${thumb}">
</head>
<body>
    <script>
        window.location.href =
            "intent://video?id=${videoId}" +
            "#Intent;scheme=https;host=relaxed-seahorse-65460e.netlify.app;" +
            "package=com.educareai.app;" +
            "S.browser_fallback_url=https://www.youtube.com/watch?v=${videoId};end";
    </script>
    <p>Abriendo en Educare AI...</p>
</body>
</html>`;

    return {
        statusCode: 200,
        headers: { "Content-Type": "text/html" },
        body: html
    };
};
