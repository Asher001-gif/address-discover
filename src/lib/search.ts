import type { Shop } from "@/data/shops";

/**
 * Levenshtein distance for basic fuzzy matching.
 * Returns edit distance between two strings.
 */
function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

/** Check if word fuzzy-matches target (allows 1-2 char difference based on length) */
function fuzzyMatch(word: string, target: string): boolean {
  if (target.includes(word)) return true;
  // For short words (<=3), only allow distance 1; otherwise allow 2
  const maxDist = word.length <= 3 ? 1 : 2;
  // Check each substring of target with same length as word
  if (target.length >= word.length) {
    for (let i = 0; i <= target.length - word.length; i++) {
      const sub = target.substring(i, i + word.length);
      if (levenshtein(word, sub) <= maxDist) return true;
    }
  } else {
    // word is longer than target, compare directly
    if (levenshtein(word, target) <= maxDist) return true;
  }
  return false;
}

/** Check if any query word matches against a text field (exact or fuzzy) */
function fieldMatchScore(words: string[], field: string): { exact: number; fuzzy: number } {
  const f = field.toLowerCase();
  let exact = 0, fuzzy = 0;
  for (const w of words) {
    if (f.includes(w)) exact++;
    else if (fuzzyMatch(w, f)) fuzzy++;
  }
  return { exact, fuzzy };
}

export interface ScoredShop {
  shop: Shop;
  score: number;
}

/**
 * Score and rank shops based on query.
 * Scoring:
 *   - Exact name match (full query in name): 100
 *   - Partial name match (any word in name): 70 per word
 *   - Tag match: 50 per word
 *   - Category/service match: 30 per word
 *   - Fuzzy matches get 60% of the above scores
 *   - Address match: 10 per word (minor boost)
 */
export function searchShops(query: string): Shop[] {
  const trimmed = query.trim().replace(/\s+/g, " ").toLowerCase();
  if (!trimmed) return [];

  const words = trimmed.split(" ").filter(Boolean);
  if (words.length === 0) return [];

  const scored: ScoredShop[] = [];

  for (const shop of (await_shops())) {
    let score = 0;
    const nameLower = shop.name.toLowerCase();
    const serviceLower = shop.service.toLowerCase();
    const tagsLower = (shop.tags || []).map(t => t.toLowerCase());
    const addressLower = shop.address.toLowerCase();

    // 1. Exact name match — full query contained in name
    if (nameLower.includes(trimmed) || trimmed.includes(nameLower)) {
      score += 100;
    }

    // 2. Partial name match — per word
    const nameMatch = fieldMatchScore(words, nameLower);
    score += nameMatch.exact * 70 + nameMatch.fuzzy * 42; // fuzzy = 60% of 70

    // 3. Tag match — per word
    let tagExact = 0, tagFuzzy = 0;
    for (const tag of tagsLower) {
      for (const w of words) {
        if (tag.includes(w) || w.includes(tag)) tagExact++;
        else if (fuzzyMatch(w, tag)) tagFuzzy++;
      }
    }
    score += tagExact * 50 + tagFuzzy * 30;

    // 4. Category/service match
    const serviceMatch = fieldMatchScore(words, serviceLower);
    score += serviceMatch.exact * 30 + serviceMatch.fuzzy * 18;

    // 5. Address match (minor)
    const addrMatch = fieldMatchScore(words, addressLower);
    score += addrMatch.exact * 10 + addrMatch.fuzzy * 6;

    // Verified bonus
    if (shop.verified && score > 0) score += 5;

    if (score > 0) {
      scored.push({ shop, score });
    }
  }

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  return scored.map(s => s.shop);
}

/** Import shops lazily to avoid circular deps */
function await_shops(): Shop[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { shops } = require("@/data/shops");
  return shops;
}
