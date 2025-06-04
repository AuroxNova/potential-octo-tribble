import indexHtml from '../public/index.html';
import scriptJs from '../public/script.js';
import styleCss from '../public/style.css';

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/hello')) {
      return new Response(JSON.stringify({ message: "Hello from API!" }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    const STATIC = {
      '/': { content: indexHtml, type: 'text/html' },
      '/index.html': { content: indexHtml, type: 'text/html' },
      '/script.js': { content: scriptJs, type: 'application/javascript' },
      '/style.css': { content: styleCss, type: 'text/css' },
    };

    const asset = STATIC[url.pathname];
    if (asset) {
      return new Response(asset.content, {
        headers: { 'Content-Type': asset.type },
      });
    }

    return new Response("Not Found", { status: 404 });
  }
};
