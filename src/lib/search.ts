import type { Shop } from "@/data/shops";

/**
 * Levenshtein distance for basic fuzzy matching.
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
  const maxDist = word.length <= 3 ? 1 : 2;
  if (target.length >= word.length) {
    for (let i = 0; i <= target.length - word.length; i++) {
      const sub = target.substring(i, i + word.length);
      if (levenshtein(word, sub) <= maxDist) return true;
    }
  } else {
    if (levenshtein(word, target) <= maxDist) return true;
  }
  return false;
}

/** Count exact and fuzzy word matches against a field */
function fieldMatchCount(words: string[], field: string): { exact: number; fuzzy: number } {
  const f = field.toLowerCase();
  let exact = 0, fuzzy = 0;
  for (const w of words) {
    if (f.includes(w)) exact++;
    else if (fuzzyMatch(w, f)) fuzzy++;
  }
  return { exact, fuzzy };
}

/**
 * Score and rank shops based on query.
 *
 * Scoring per matched word:
 *   Exact name match (full query): +100
 *   Partial name word:   exact +70, fuzzy +42
 *   Tag word:            exact +50, fuzzy +30
 *   Service/category:    exact +30, fuzzy +18
 *   Address:             exact +10, fuzzy +6
 *   Verified bonus:      +5 (if score > 0)
 *
 * Returns only shops with score > 0, sorted descending.
 */
export function searchShops(query: string, allShops: Shop[]): Shop[] {
  const trimmed = query.trim().replace(/\s+/g, " ").toLowerCase();
  if (!trimmed) return [];

  const words = trimmed.split(" ").filter(Boolean);
  if (words.length === 0) return [];

  const scored: { shop: Shop; score: number }[] = [];

  for (const shop of allShops) {
    let score = 0;
    const nameLower = shop.name.toLowerCase();
    const serviceLower = shop.service.toLowerCase();
    const tagsLower = (shop.tags || []).map(t => t.toLowerCase());
    const addressLower = shop.address.toLowerCase();

    // 1. Exact name match — full query in name or name in query
    if (nameLower.includes(trimmed) || trimmed.includes(nameLower)) {
      score += 100;
    }

    // 2. Partial name match
    const nameMatch = fieldMatchCount(words, nameLower);
    score += nameMatch.exact * 70 + nameMatch.fuzzy * 42;

    // 3. Tag match
    for (const tag of tagsLower) {
      for (const w of words) {
        if (tag.includes(w) || w.includes(tag)) score += 50;
        else if (fuzzyMatch(w, tag)) score += 30;
      }
    }

    // 4. Service/category match
    const svcMatch = fieldMatchCount(words, serviceLower);
    score += svcMatch.exact * 30 + svcMatch.fuzzy * 18;

    // 5. Address match (minor boost)
    const addrMatch = fieldMatchCount(words, addressLower);
    score += addrMatch.exact * 10 + addrMatch.fuzzy * 6;

    // Verified bonus
    if (shop.verified && score > 0) score += 5;

    if (score > 0) {
      scored.push({ shop, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.map(s => s.shop);
}
