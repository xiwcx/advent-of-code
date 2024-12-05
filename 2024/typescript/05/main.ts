type Rule = [x: number, y: number];
type ProcessInputResult = {
  rules: Rule[];
  batches: number[][];
};

function processInput(input: string): ProcessInputResult {
  const [rules, updates] = input.split("\n\n");
  const processedRules: Rule[] = rules.split("\n").map((item) => {
    const [x, y] = item.split("|");

    return [Number(x), Number(y)];
  });
  const processedUpdates: number[][] = updates
    .split("\n")
    .map((item) => item.split(",").map((item) => Number(item)));

  return {
    rules: processedRules,
    batches: processedUpdates,
  };
}

function isInOrder(batch: number[], rules: Rule[]): boolean {
  for (const [x, y] of rules) {
    const xIndex = batch.indexOf(x);
    const yIndex = batch.indexOf(y);

    if (xIndex >= 0 && yIndex >= 0 && xIndex > yIndex) {
      return false;
    }
  }

  return true;
}

/**
 * https://adventofcode.com/2024/day/5
 */
export function partOne(input: string): number {
  const { rules, batches } = processInput(input);

  let count: number = 0;

  for (const batch of batches) {
    if (isInOrder(batch, rules)) {
      count += batch[Math.floor(batch.length / 2)];
    }
  }

  return count;
}

// =======

const isRuleMatch = (a: Rule, b: Rule) => a[0] === b[0] && a[1] === b[1];

function sortBatch(batch: number[], rules: Rule[]): number[] {
  const batchCopy: number[] = Array.from(batch);

  while (true) {
    let isSorted = true;

    for (let i = 1; i < batchCopy.length; i++) {
      const prev = batchCopy[i - 1];
      const curr = batchCopy[i];

      if (rules.find((r) => isRuleMatch([curr, prev], r))) {
        isSorted = false;

        [batchCopy[i], batchCopy[i - 1]] = [batchCopy[i - 1], batchCopy[i]];
      }
    }

    if (isSorted) return batchCopy;
  }
}

/**
 * inspiration from https://www.youtube.com/watch?v=LA4RiCDPUlI
 *
 * https://adventofcode.com/2024/day/5#part2
 */
export function partTwo(input: string): number {
  const { rules, batches } = processInput(input);

  let count: number = 0;

  for (const batch of batches) {
    if (!isInOrder(batch, rules)) {
      const sortedBatch = sortBatch(batch, rules);

      count += sortedBatch[Math.floor(sortedBatch.length / 2)];
    }
  }

  return count;
}
