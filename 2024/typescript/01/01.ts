export function getTotalDistance(input: string): number {
  const values = input.split("\n");
  const lVals: number[] = [];
  const rVals: number[] = [];

  values.forEach((v) => {
    const [l, r] = v.split("   ");

    lVals.push(Number(l));
    rVals.push(Number(r));
  });

  lVals.sort();
  rVals.sort();

  return lVals.reduce((a, c, i) => {
    const diff = c - rVals[i];

    return a + Math.abs(diff);
  }, 0);
}

export function getSimilarityScore(input: string): number {
  let total = 0;
  const columns = input.split("\n");
  const frequencies = new Map<number, [number, number]>();

  for (const c of columns) {
    const [l, r] = c.split("   ");
    const lNum = Number(l);
    const rNum = Number(r);

    const lFreq = frequencies.get(lNum);

    if (lFreq) {
      frequencies.set(lNum, [lFreq[0] + 1, lFreq[1]]);
    } else {
      frequencies.set(lNum, [1, 0]);
    }

    const rFreq = frequencies.get(rNum);

    if (rFreq) {
      frequencies.set(rNum, [rFreq[0], rFreq[1] + 1]);
    } else {
      frequencies.set(rNum, [0, 1]);
    }
  }

  for (const [k, [l, r]] of frequencies.entries()) {
    if (l > 0) {
      total += k * l * r;
    }
  }

  return total;
}
