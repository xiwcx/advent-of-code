type coordinate = [x: number, y: number];
const directions: coordinate[] = [
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
  d: coordinate,
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

// =====

type directionPair = [coordinate, coordinate];
const forwardSlant: directionPair = [
  [-1, -1],
  [1, 1],
];
const backwardSlant: directionPair = [
  [-1, 1],
  [1, -1],
];

function isSamMatch(
  rows: string[],
  rq: number,
  cq: number,
  d: directionPair,
  x: number,
  y: number
): boolean {
  // get relative coordinates
  const [firstX, firstY]: coordinate = [x + d[0][0], y + d[0][1]];
  const [secondX, secondY]: coordinate = [x + d[1][0], y + d[1][1]];

  // short-circuit if anything is out of bounds, could have been single condition, but yikes
  if (0 > firstX || firstX >= cq || 0 > firstY || firstY >= rq) return false;
  if (0 > secondX || secondX >= cq || 0 > secondY || secondY >= rq)
    return false;

  const firstLetter = rows[firstX][firstY];
  const secondLetter = rows[secondX][secondY];

  // again, could have been single condi
  if (
    (firstLetter === "S" && secondLetter === "M") ||
    (firstLetter === "M" && secondLetter === "S")
  )
    return true;

  return false;
}

type Grid = [rows: string[], rowQ: number, colQ: number];

/**
 *
 * https://adventofcode.com/2024/day/4#part2
 */
export function partTwo(input: string): number {
  let count: number = 0;

  const rows: string[] = input.split("\n");
  const rowQuantity: number = rows.length;
  const columnQuantity: number = rows[0].length;
  // sugar to make calling `isSamMatch` less gnarly
  const grid: Grid = [rows, rowQuantity, columnQuantity];

  for (let row = 0; row < rowQuantity; row++) {
    for (let column = 0; column < columnQuantity; column++) {
      // radiate outward from any "A"
      if (rows[row][column] === "A") {
        // check both directions
        if (
          isSamMatch(...grid, forwardSlant, row, column) &&
          isSamMatch(...grid, backwardSlant, row, column)
        ) {
          count++;
        }
      }
    }
  }

  return count;
}
