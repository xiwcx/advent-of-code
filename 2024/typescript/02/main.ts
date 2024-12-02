function isRowSafe(row: string[]): boolean {
  let direction: "desc" | "asc" | null = null;

  for (let i = 1; i < row.length; i++) {
    const previous: number = Number(row[i - 1]);
    const current: number = Number(row[i]);

    if (Math.abs(previous - current) > 3 || previous === current) return false;

    if (!direction) {
      direction = previous < current ? "asc" : "desc";
    } else if (direction === "asc" && current < previous) {
      return false;
    } else if (direction === "desc" && current > previous) {
      return false;
    }
  }

  return true;
}

/**
 * https://adventofcode.com/2024/day/2
 */
export function getSafetyReport(input: string): number {
  let safeCount: number = 0;
  const rows = input.split("\n");

  for (const row of rows) {
    if (isRowSafe(row.split(" "))) safeCount++;
  }

  return safeCount;
}
