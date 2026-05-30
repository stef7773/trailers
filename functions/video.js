export async function onRequest(context) {
  const url = new URL(context.request.url);
  const videoId = url.searchParams.get('id') || '';

  const thumbUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : '';

  const title = videoId
    ? 'Educare AI 🎬'
    : 'Educare AI 🎬';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta property="og:type" content="video.other" />
  <meta property="og:site_name" content="Educare AI" />
  <meta property="og:title" content="Educare AI 🎬" />
  <meta property="og:description" content=" " />
  <meta property="og:image" content="${thumbUrl}" />
  <meta property="og:url" content="https://trailers-cql.pages.dev/video?id=${videoId}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Educare AI 🎬" />
  <meta name="twitter:description" content=" " />
  <meta name="twitter:image" content="${thumbUrl}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #090909; --surface: #111; --accent: #e50914;
      --text: #f0f0f0; --muted: #888; --radius: 14px;
    }
    html, body { height: 100%; background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; }
    body { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100svh; padding: 24px 16px 40px; position: relative; }
    body::before { content: ''; position: fixed; inset: 0; background: radial-gradient(ellipse 80% 50% at 50% -10%, rgba(229,9,20,0.18) 0%, transparent 70%); pointer-events: none; z-index: 0; }
    .card { position: relative; z-index: 1; width: 100%; max-width: 420px; background: var(--surface); border-radius: var(--radius); overflow: hidden; box-shadow: 0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05); animation: slideUp 0.5s cubic-bezier(0.22,1,0.36,1) both; }
    @keyframes slideUp { from { opacity:0; transform:translateY(30px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
    .thumb-wrap { position: relative; width: 100%; aspect-ratio: 16/9; background: #1a1a1a; overflow: hidden; }
    .thumb-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .play-overlay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%); }
    .play-circle { width: 64px; height: 64px; background: rgba(229,9,20,0.9); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 8px rgba(229,9,20,0.2); animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100%{box-shadow:0 0 0 8px rgba(229,9,20,0.2);} 50%{box-shadow:0 0 0 16px rgba(229,9,20,0.06);} }
    .play-circle svg { margin-left: 4px; }
    .badge { position: absolute; top: 10px; right: 10px; background: rgba(229,9,20,0.95); color: #fff; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 8px; border-radius: 4px; }
    .content { padding: 20px 20px 24px; }
    .app-label { display: flex; align-items: center; gap: 6px; margin-bottom: 10px; }
    .app-dot { width: 8px; height: 8px; background: var(--accent); border-radius: 50%; animation: blink 1.8s infinite; }
    @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
    .app-label span { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
    h1 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(22px,6vw,30px); line-height: 1.1; color: var(--text); margin-bottom: 6px; letter-spacing: 0.02em; }
    .subtitle { font-size: 13px; color: var(--muted); margin-bottom: 22px; line-height: 1.4; }
    .btn-open { display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%; padding: 15px 20px; background: linear-gradient(135deg, var(--accent), #b50710); color: #fff; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700; border: none; border-radius: 10px; cursor: pointer; text-decoration: none; box-shadow: 0 4px 20px rgba(229,9,20,0.4); margin-bottom: 10px; transition: transform 0.15s ease; }
    .btn-open:active { transform: scale(0.97); }
    .btn-download { display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%; padding: 15px 20px; background: linear-gradient(135deg, #16a34a, #15803d); color: #fff; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700; border: none; border-radius: 10px; cursor: pointer; text-decoration: none; box-shadow: 0 4px 20px rgba(22,163,74,0.4); transition: transform 0.15s ease; }
    .btn-download:active { transform: scale(0.97); }
    .footer { position: relative; z-index: 1; margin-top: 20px; text-align: center; font-size: 11px; color: var(--muted); letter-spacing: 0.04em; }
    .footer strong { color: rgba(255,255,255,0.35); font-weight: 600; }
    .message { text-align: center; font-size: 12px; color: var(--muted); margin-top: 12px; }
  </style>
</head>
<body>
  <div class="card">
    ${videoId ? `
    <div class="thumb-wrap">
      <img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg"
           onerror="this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg'" alt="Thumbnail" />
      <div class="play-overlay">
        <div class="play-circle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="6,3 20,12 6,21"/></svg>
        </div>
      </div>
      <div class="badge">NO ADS</div>
    </div>` : ''}
    <div class="content">
      <div class="app-label"><div class="app-dot"></div><span>EDUCARE AI</span></div>
      <h1>${videoId ? 'Watch Trailer' : 'Trailers'}</h1>
      <p class="subtitle">${videoId ? 'Open in app · No ads' : 'No ads · Better quality'}</p>
      
      <a class="btn-open" id="openBtn" href="#">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5,3 19,12 5,21"/></svg>
        Open in App
      </a>
      
      <a class="btn-download" id="downloadBtn" href="https://play.google.com/store/apps/details?id=com.educareai.app" target="_blank">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15V3M8 11l4 4 4-4"/><path d="M3 17v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2"/></svg>
        Download
      </a>
      
      <div class="message" id="msg">✨ Open in Educare AI for better experience</div>
    </div>
  </div>
  <div class="footer"><strong>EDUCARE AI</strong> · Trailers without ads</div>

  <script>
    var videoId = '${videoId}';
    var appScheme = 'educare://video?id=' + videoId;
    var fallbackUrl = 'https://play.google.com/store/apps/details?id=com.educareai.app';
    
    var openBtn = document.getElementById('openBtn');
    var downloadBtn = document.getElementById('downloadBtn');
    var msg = document.getElementById('msg');
    
    var openTimeout;
    var hasOpened = false;
    
    function tryOpenApp() {
      if (hasOpened) return;
      hasOpened = true;
      
      window.location.href = appScheme;
      
      openTimeout = setTimeout(function() {
        msg.innerHTML = "⬇️ Don't have the app? Tap Download below ⬇️";
        msg.style.color = '#16a34a';
      }, 800);
    }
    
    function onPageHide() {
      clearTimeout(openTimeout);
      msg.innerHTML = "✓ Opening app...";
    }
    
    openBtn.onclick = function(e) {
      e.preventDefault();
      tryOpenApp();
      return false;
    };
    
    window.addEventListener('pagehide', onPageHide);
    window.addEventListener('blur', onPageHide);
    
    if (videoId) {
      setTimeout(tryOpenApp, 50);
    }
  </script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      'Cache-Control': 'no-cache',
    },
  });
}
