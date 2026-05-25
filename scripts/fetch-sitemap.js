const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const SITEMAP_URL = 'https://help.gohighlevel.com/support/sitemap.xml';
const OUTPUT = path.join(__dirname, '../paste.txt');
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';

(async () => {
  const res = await fetch(SITEMAP_URL, {
    headers: {
      'User-Agent': USER_AGENT,
      'Accept': 'application/xml,text/xml,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5'
    }
  });

  if (!res.ok) {
    console.error(`Sitemap fetch failed: ${res.status} ${res.statusText}`);
    process.exit(1);
  }

  const xml = await res.text();
  if (xml.includes('Just a moment') || xml.includes('Cloudflare')) {
    console.error('Sitemap response looks like a Cloudflare challenge page — bailing out.');
    process.exit(2);
  }

  const urlCount = (xml.match(/<loc>/g) || []).length;
  if (urlCount < 100) {
    console.error(`Sitemap suspiciously small (${urlCount} <loc> entries) — bailing out.`);
    process.exit(3);
  }

  fs.writeFileSync(OUTPUT, xml);
  console.log(`Wrote ${OUTPUT} (${xml.length} bytes, ${urlCount} URL entries).`);
})();
