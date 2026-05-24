const fs = require('fs');
const path = require('path');

const RULES = path.join(__dirname, '../config/category-rules.json');
const OUTPUT = path.join(__dirname, '../output/sitemap-category-urls.json');

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

(() => {
  const rules = loadRules();
  const existing = JSON.parse(fs.readFileSync(OUTPUT, 'utf8'));

  const all = [];
  for (const [, items] of Object.entries(existing.categories || {})) {
    for (const it of items) all.push(it);
  }
  for (const it of existing.uncategorized || []) all.push(it);

  const out = {
    generated_at: new Date().toISOString(),
    source: existing.source,
    note: 'Re-categorized from existing fetched titles (no network)',
    categories: {},
    uncategorized: []
  };

  for (const item of all) {
    const category = categorize(item.title, rules);
    if (category === 'uncategorized') {
      out.uncategorized.push(item);
    } else {
      if (!out.categories[category]) out.categories[category] = [];
      out.categories[category].push(item);
    }
  }

  fs.writeFileSync(OUTPUT, JSON.stringify(out, null, 2));
  console.log(`Re-categorized ${all.length} items.`);
})();
