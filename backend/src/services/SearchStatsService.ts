
// A simple in-memory store for search query statistics
const searchQueries = new Map<string, number>();

/**
 * Registers a search query.
 * @param query The search query to register.
 */
export function registerSearchQuery(query: string): void {
  const count = searchQueries.get(query) || 0;
  searchQueries.set(query, count + 1);
}

/**
 * Gets the top five search queries with their percentages.
 * @returns An array of objects, each containing a query and its percentage.
 */
export function getTopFiveQueries(): { query: string; percentage: number }[] {
  const totalQueries = Array.from(searchQueries.values()).reduce(
    (sum, count) => sum + count,
    0
  );

  if (totalQueries === 0) {
    return [];
  }

  const sortedQueries = Array.from(searchQueries.entries()).sort(
    (a, b) => b[1] - a[1]
  );

  const topFive = sortedQueries.slice(0, 5);

  return topFive.map(([query, count]) => ({
    query,
    percentage: (count / totalQueries) * 100,
  }));
}
