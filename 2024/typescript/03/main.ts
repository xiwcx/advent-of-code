const opener = "mul(";

function getMultiplicationResult(input: string): number | null {
  const parts = input.split(",");

  if (parts.length !== 2) return null;

  const a = parts[0];
  const b = parts[1];

  if (a.length !== a.trim().length || b.length !== b.trim().length) return null;

  const aNum = Number(a);
  const bNum = Number(b);

  if (!Number.isInteger(aNum) || !Number.isInteger(bNum)) return null;

  return aNum * bNum;
}

/**
 * https://adventofcode.com/2024/day/3
 */
export function getUncorruptedResult(input: string): number {
  let total: number = 0;
  let potentialOpener: string = "";
  const potentiaOpeningIndeces: number[] = [];

  for (let i = 0; i < input.length; i++) {
    const current = input[i];

    if (current === ")" && potentiaOpeningIndeces.length) {
      const l = potentiaOpeningIndeces.pop();

      const contents = input.substring(l, i);
      const result = getMultiplicationResult(contents);

      if (result !== null) total += result;

      potentialOpener = "";
    } else if (potentialOpener === opener) {
      potentiaOpeningIndeces.push(i);
      potentialOpener = "";
    } else if (potentialOpener.length) {
      potentialOpener += current;

      if (!opener.includes(potentialOpener)) {
        potentialOpener = "";
      }
    } else if (current === "m") {
      potentialOpener = "m";
    }
  }

  return total;
}
