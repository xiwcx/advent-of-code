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
