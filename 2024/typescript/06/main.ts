type Direction = "up" | "right" | "down" | "left";
type Coordinate = [x: number, y: number];

const carrot = ["^", ">", "v", "<"] as const;
type Carrot = (typeof carrot)[number];

const carrotDirection: Record<Carrot, Direction> = {
  "^": "up",
  ">": "right",
  v: "down",
  "<": "left",
};

interface DirectionInterface {
  move: Coordinate;
  pivot: Direction;
}

const direction: Record<Direction, DirectionInterface> = {
  up: {
    move: [0, -1],
    pivot: "right",
  },
  right: {
    move: [1, 0],
    pivot: "down",
  },
  down: {
    move: [0, 1],
    pivot: "left",
  },
  left: {
    move: [-1, 0],
    pivot: "up",
  },
};

function getInitial(rows: string[]): {
  initialPosition: Coordinate;
  inititalDirection: Direction;
} | null {
  for (let y = 0; y < rows.length; y++) {
    const x = rows[y]
      .split("")
      .findIndex((char) => carrot.includes(char as Carrot));

    if (x > 0) {
      const char = rows[y][x] as Carrot;

      return {
        initialPosition: [x, y],
        inititalDirection: carrotDirection[char],
      };
    }
  }

  return null;
}

function isInBounds(
  currentPosition: Coordinate,
  height: number,
  width: number
): boolean {
  const [x, y] = currentPosition;

  if (x < 0 || x >= width) return false;
  if (y < 0 || y >= height) return false;

  return true;
}

/**
 * https://adventofcode.com/2024/day/6
 */
export function partOne(input: string): number {
  const rows = input.split("\n");
  const height = rows.length;
  const width = rows[0].length;
  const initial = getInitial(rows);
  const position: Coordinate[] = [];
  let currentDirection: Direction | null = null;

  if (initial) {
    const { initialPosition, inititalDirection } = initial;

    position.push(initialPosition);
    currentDirection = inititalDirection;
  }

  while (currentDirection) {
    const [moveX, moveY]: Coordinate = direction[currentDirection].move;
    const [currentX, currentY]: Coordinate = position[position.length - 1];
    const newPosition: Coordinate = [currentX + moveX, currentY + moveY];

    // guard has left area
    if (!isInBounds(newPosition, height, width)) {
      const positions = new Set(position.map((p) => p.join(",")));

      return positions.size;
    }

    const [newX, newY]: Coordinate = newPosition;
    const newChar = rows[newY][newX];

    if (newChar === "#") {
      currentDirection = direction[currentDirection].pivot;
    } else {
      position.push([newX, newY]);
    }
  }

  return 0;
}
