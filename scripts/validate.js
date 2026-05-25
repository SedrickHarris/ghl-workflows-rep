const fs = require('fs');
const path = require('path');

const RULES = path.join(__dirname, '../config/category-rules.json');
const OUTPUT = path.join(__dirname, '../output/sitemap-category-urls.json');
const UNCATEGORIZED_FAIL_THRESHOLD = 0.30;

function fail(msg) {
  console.error(`FAIL: ${msg}`);
  process.exit(1);
}

(() => {
  if (!fs.existsSync(OUTPUT)) fail(`Output file missing: ${OUTPUT}`);
  if (!fs.existsSync(RULES)) fail(`Rules file missing: ${RULES}`);

  let rules, out;
  try { rules = JSON.parse(fs.readFileSync(RULES, 'utf8')); } catch (e) { fail(`Rules JSON invalid: ${e.message}`); }
  try { out = JSON.parse(fs.readFileSync(OUTPUT, 'utf8')); } catch (e) { fail(`Output JSON invalid: ${e.message}`); }

  if (typeof out.categories !== 'object') fail('Output missing categories object');
  if (!Array.isArray(out.uncategorized)) fail('Output missing uncategorized array');

  for (const [cat, terms] of Object.entries(rules)) {
    if (!Array.isArray(terms) || terms.length === 0) fail(`Rule "${cat}" has no terms`);
  }

  let catCount = 0;
  const cfHits = [];
  for (const [cat, items] of Object.entries(out.categories)) {
    catCount += items.length;
    for (const it of items) {
      if (it.title && /just a moment|just moment/i.test(it.title)) {
        cfHits.push({ where: cat, url: it.url, title: it.title });
      }
    }
  }
  for (const it of out.uncategorized) {
    if (it.title && /just a moment|just moment/i.test(it.title)) {
      cfHits.push({ where: 'uncategorized', url: it.url, title: it.title });
    }
  }

  if (cfHits.length > 0) {
    console.error(`FAIL: ${cfHits.length} Cloudflare-challenge titles detected (fetch was bot-blocked).`);
    console.error(`  First hit: ${cfHits[0].where} — ${cfHits[0].url}`);
    process.exit(1);
  }

  const total = catCount + out.uncategorized.length;
  const uncatRate = out.uncategorized.length / total;

  console.log(`OK  output structure valid`);
  console.log(`OK  ${Object.keys(rules).length} rule categories, ${Object.values(rules).flat().length} terms`);
  console.log(`OK  ${total} total URLs (${catCount} categorized, ${out.uncategorized.length} uncategorized = ${(uncatRate*100).toFixed(1)}%)`);
  console.log(`OK  no Cloudflare-challenge titles`);

  if (uncatRate > UNCATEGORIZED_FAIL_THRESHOLD) {
    fail(`Uncategorized rate ${(uncatRate*100).toFixed(1)}% exceeds threshold ${(UNCATEGORIZED_FAIL_THRESHOLD*100).toFixed(0)}% — rules may be stale or fetch was incomplete.`);
  }
  console.log(`OK  uncategorized rate under ${(UNCATEGORIZED_FAIL_THRESHOLD*100).toFixed(0)}% threshold`);
})();
