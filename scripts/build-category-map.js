const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const INPUT = path.join(__dirname, '../paste.txt');
const RULES = path.join(__dirname, '../config/category-rules.json');
const OUTPUT = path.join(__dirname, '../output/sitemap-category-urls.json');

function extractUrls(text) {
  const re = /https:\/\/help\.gohighlevel\.com\/support\/solutions(?:\/articles\/[^<\s"]+|\/folders\/\d+|\/\d+)?/g;
  return [...new Set((text.match(re) || []).map(u => u.replace(/&amp;/g, '&')))];
}

function extractId(url) {
  const m = url.match(/\/solutions\/articles\/(\d+)/) || url.match(/\/solutions\/folders\/(\d+)/) || url.match(/\/solutions\/(\d+)/);
  return m ? m[1] : null;
}

function titleFromSlug(url) {
  const slug = url.split('/').pop() || '';
  return decodeURIComponent(slug.replace(/^\d+-?/, '').replace(/-/g, ' ')).trim();
}

const FETCH_DELAY_MS = 200;
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';

async function fetchTitle(url) {
  await sleep(FETCH_DELAY_MS);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      }
    });
    const html = await res.text();
    const $ = cheerio.load(html);
    const title = $('title').first().text();
    if (title) return title.replace(/\s*-\s*HighLevel Support Portal\s*$/i, '').trim();
  } catch {}
  return titleFromSlug(url);
}

function loadRules() {
  return JSON.parse(fs.readFileSync(RULES, 'utf8'));
}

function categorize(title, rules) {
  const t = (title || '').toLowerCase();
  for (const [category, terms] of Object.entries(rules)) {
    if (terms.some(term => t.includes(term.toLowerCase()))) return category;
  }
  return 'uncategorized';
}

(async () => {
  const rules = loadRules();
  const raw = fs.readFileSync(INPUT, 'utf8');
  const urls = extractUrls(raw);

  const out = {
    generated_at: new Date().toISOString(),
    source: 'https://help.gohighlevel.com/support/sitemap.xml',
    categories: {},
    uncategorized: []
  };

  for (const url of urls) {
    const title = await fetchTitle(url);
    const category = categorize(title, rules);
    const item = {
      id: extractId(url),
      title,
      url,
      match_type: title && title !== titleFromSlug(url) ? 'title' : 'slug'
    };

    if (category === 'uncategorized') {
      out.uncategorized.push(item);
    } else {
      if (!out.categories[category]) out.categories[category] = [];
      out.categories[category].push(item);
    }
  }

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, JSON.stringify(out, null, 2));
  console.log(`Wrote ${OUTPUT}`);
})();
