type Row = {
  product: number;
  values: number[];
};

const getRows = (input: string): Row[] =>
  input.split("\n").map((row) => {
    const [product, vals] = row.split(":");

    return {
      product: Number(product),
      values: vals
        .trim()
        .split(" ")
        .map((i) => Number(i)),
    };
  });

/**
 * https://adventofcode.com/2024/day/7
 */
export function partOne(input: string): number {
  let total = 0;

  for (const { product, values } of getRows(input)) {
    const [firstValue, ...remainingValues] = values;
    let potentialProducts: number[] = [firstValue];

    for (let i = 0; i < remainingValues.length; i++) {
      const currentValue: number = remainingValues[i];
      const additionProducts = potentialProducts.map((a) => currentValue + a);
      const multiplicationProducts = potentialProducts.map(
        (a) => currentValue * a
      );
      const newPotentialProducts = additionProducts.concat(
        multiplicationProducts
      );

      if (
        i === remainingValues.length - 1 &&
        newPotentialProducts.includes(product)
      ) {
        total += product;
      } else {
        potentialProducts = newPotentialProducts.filter((p) => p < product);
      }
    }
  }

  return total;
}
