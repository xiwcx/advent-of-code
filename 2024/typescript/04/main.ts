type direction = [x: number, y: number];
const directions: direction[] = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const MAS: string = "MAS";

function isMatch(
  rows: string[],
  rq: number,
  cq: number,
  d: direction,
  x: number,
  y: number
): boolean {
  // we've already accounted for "X", start searching path from 1th position
  for (let i = 1; i <= MAS.length; i++) {
    const dx = x + i * d[0];
    const dy = y + i * d[1];

    // short-circuit if out of bounds
    if (0 > dx || dx >= cq || 0 > dy || dy >= rq) return false;

    // short-circut if not a match
    if (MAS[i - 1] !== rows[dx][dy]) return false;
  }

  return true;
}

/**
 * inspiration from https://www.youtube.com/watch?v=L8lNcd9yQuY&t=75s
 *
 * https://adventofcode.com/2024/day/4
 */
export function partOne(input: string): number {
  let count: number = 0;

  const rows = input.split("\n");
  const rowQuantity = rows.length;
  const columnQuantity = rows[0].length;

  for (let row = 0; row < rowQuantity; row++) {
    for (let column = 0; column < columnQuantity; column++) {
      // only search for matches if starting character is X
      if (rows[row][column] === "X") {
        // iterate through list of directions
        for (const d of directions) {
          if (isMatch(rows, rowQuantity, columnQuantity, d, row, column)) {
            count++;
          }
        }
      }
    }
  }

  return count;
}
