const opener = "mul(";

function getMultiplicationResult(input: string): number | null {
  const parts = input.split(",");

  // return null if we don't have two neat parts
  if (parts.length !== 2) return null;

  const a = parts[0];
  const b = parts[1];

  // return null if either part contains padding
  if (a.length !== a.trim().length || b.length !== b.trim().length) return null;

  const aNum = Number(a);
  const bNum = Number(b);

  // return nul if eithe part can't be resolved as an integer
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
      // if we've got a closer check for the presence of an opener
      const l = potentiaOpeningIndeces.pop();

      // there is an earier check for this exact thing, but typescript doesn't recognize it
      // six / half dozen on least ugly way to handle this
      if (typeof l === "undefined") continue;

      const contents = input.substring(l, i);
      const result = getMultiplicationResult(contents);

      if (result !== null) total += result;

      potentialOpener = "";
    } else if (potentialOpener === opener) {
      // if opener is complete, push index to stack
      potentiaOpeningIndeces.push(i);
      potentialOpener = "";
    } else if (potentialOpener.length) {
      // if potential opener continue to build and check
      potentialOpener += current;

      if (!opener.includes(potentialOpener)) {
        potentialOpener = "";
      }
    } else if (current === "m") {
      // if no potential opener start building if potential
      potentialOpener = "m";
    }
  }

  return total;
}
