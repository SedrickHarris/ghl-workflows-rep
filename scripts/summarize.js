const fs = require('fs');
const path = require('path');

const OUTPUT = path.join(__dirname, '../output/sitemap-category-urls.json');
const SUMMARY = path.join(__dirname, '../output/sitemap-summary.json');

const STOP_WORDS = new Set(['the','a','an','and','or','of','in','to','for','on','with','is','are','how','what','why','where','when','be','by','do','can','this','that','as','at','it','you','your','highlevel','support','portal','guide','overview','using','use','set','up','setup','create','new','add','help','manage','my','i','from','not','will','have','has','its','was','were','if','only','no','any','all','&']);

function normalizeTitle(t) {
  return (t || '').replace(/\s*:\s*HighLevel Support Portal\s*$/i, '').trim();
}

function topBigrams(items, n = 20) {
  const counts = new Map();
  for (const it of items) {
    const title = normalizeTitle(it.title).toLowerCase().replace(/[^\w\s-]/g, '');
    const words = title.split(/\s+/).filter(w => w.length > 1 && !STOP_WORDS.has(w));
    for (let i = 0; i < words.length - 1; i++) {
      const bigram = `${words[i]} ${words[i + 1]}`;
      counts.set(bigram, (counts.get(bigram) || 0) + 1);
    }
  }
  return [...counts.entries()]
    .filter(([, c]) => c >= 2)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, n)
    .map(([phrase, count]) => ({ phrase, count }));
}

(() => {
  if (!fs.existsSync(OUTPUT)) {
    console.error(`Output file missing: ${OUTPUT}`);
    process.exit(1);
  }

  const out = JSON.parse(fs.readFileSync(OUTPUT, 'utf8'));

  const categoryCounts = {};
  let categorized = 0;
  for (const [cat, items] of Object.entries(out.categories || {})) {
    categoryCounts[cat] = items.length;
    categorized += items.length;
  }
  const uncategorized = (out.uncategorized || []).length;
  const total = categorized + uncategorized;

  const sortedCategoryCounts = Object.fromEntries(
    Object.keys(categoryCounts).sort().map(k => [k, categoryCounts[k]])
  );

  const uncategorizedTitles = (out.uncategorized || [])
    .map(it => normalizeTitle(it.title))
    .filter(t => t.length > 0)
    .sort((a, b) => a.localeCompare(b));

  const summary = {
    generated_at: new Date().toISOString(),
    source: out.source || 'unknown',
    totals: {
      total,
      categorized,
      uncategorized,
      uncategorized_rate: total > 0 ? Number((uncategorized / total).toFixed(4)) : 0
    },
    category_counts: sortedCategoryCounts,
    uncategorized_top_bigrams: topBigrams(out.uncategorized || []),
    uncategorized_titles: uncategorizedTitles
  };

  fs.writeFileSync(SUMMARY, JSON.stringify(summary, null, 2));
  console.log(`Wrote ${SUMMARY}`);
  console.log(`  total=${total} categorized=${categorized} uncategorized=${uncategorized} (${(summary.totals.uncategorized_rate * 100).toFixed(1)}%)`);
  console.log(`  categories=${Object.keys(sortedCategoryCounts).length} top_bigrams=${summary.uncategorized_top_bigrams.length} uncategorized_titles=${uncategorizedTitles.length}`);
})();
