const input = Deno.readTextFileSync("input.txt").split("\r\n");
console.time("t");
type Point = [number, number];
const filledPoints: Set<string> = new Set();

const pointToString = (point: Point) => point.join(",");

const drawLine = (a: Point, b: Point) => {
  const [x1, y1] = a;
  const [x2, y2] = b;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const steps = Math.max(Math.abs(dx), Math.abs(dy));

  for (let i = 0; i <= steps; i++) {
    const x = x1 + (dx * i) / steps;
    const y = y1 + (dy * i) / steps;
    filledPoints.add(pointToString([x, y]));
  }
};

for (const line of input) {
  const points = line.split(" -> ");

  for (let i = 0; i < points.length - 1; i++) {
    const pair = points.slice(i, i + 2);
    const [a, b] = pair.map((p) => p.split(",").map(Number) as Point);
    drawLine(a, b);
  }
}

const getBottomLimit = () => {
  let max = -Infinity;
  for (const point of filledPoints) {
    const [, y] = point.split(",").map(Number);
    if (y > max) max = y;
  }
  return max;
};

const movements = [
  [0, 1],
  [-1, 1],
  [1, 1],
] as const;

const dropSand = (position: Point) => {
  const bottomLimit = getBottomLimit();

  while (true) {
    const startingPos = position.slice() as Point;

    for (let i = 0; i < 3; i++) {
      if (
        !filledPoints.has(
          pointToString([
            position[0] + movements[i][0],
            position[1] + movements[i][1],
          ])
        )
      ) {
        position[0] += movements[i][0];
        position[1] += movements[i][1];
        break;
      }
    }
    if (position[1] >= bottomLimit) return true;

    if (startingPos[0] === position[0] && startingPos[1] === position[1]) {
      filledPoints.add(pointToString(position));
      break;
    }
  }
};

let count = 0;
while (!dropSand([500, 0])) count++;
console.log(count);
console.timeLog("t");
