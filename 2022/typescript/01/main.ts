/**
 * https://adventofcode.com/2024/day/1
 */
export function findMax(input: string): number {
  const rows: string[] = input.split("\n");
  const totals: number[] = [];
  let currentTotal = 0;

  for (const row of rows) {
    const parsedRow = Number.parseInt(row);

    if (Number.isInteger(parsedRow)) {
      currentTotal += parsedRow;
    } else {
      totals.push(currentTotal);
      currentTotal = 0;
    }
  }

  return Math.max(...totals);
}

/**
 * https://adventofcode.com/2022/day/1#part2
 */
export function findTopThree(input: string): number {
  const rows: string[] = input.split("\n");
  const totals: number[] = [];
  let currentTotal = 0;

  for (let i = 0; i < rows.length; i++) {
    const curr = rows[i];
    const parsedCurr = Number.parseInt(curr);

    if (Number.isInteger(parsedCurr)) {
      currentTotal += parsedCurr;

      if (i === rows.length - 1) totals.push(currentTotal);
    } else {
      totals.push(currentTotal);
      currentTotal = 0;
    }
  }

  totals.sort((a, b) => b - a);

  console.log(
    totals,
    totals.slice(0, 3),
    totals.slice(0, 3).reduce((a, c) => a + c, 0)
  );

  return totals.slice(0, 3).reduce((a, c) => a + c, 0);
}
