const input = Deno.readTextFileSync("input.txt").split("\r\n");

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

const movements = {
  down: [0, 1],
  downLeft: [-1, 1],
  downRight: [1, 1],
};

const getBottomLimit = () => {
  let max = -Infinity;
  for (const point of filledPoints) {
    const [, y] = point.split(",").map(Number);
    if (y > max) max = y;
  }
  return max;
};

const dropSand = () => {
  const currentPos: Point = [500, 0];
  const bottomLimit = getBottomLimit();

  while (true) {
    const startingPos: Point = [...currentPos];

    for (const [dx, dy] of Object.values(movements)) {
      const [x, y] = currentPos;
      const newPos = [x + dx, y + dy] as Point;

      if (!filledPoints.has(pointToString(newPos))) {
        currentPos[0] += dx;
        currentPos[1] += dy;
        break;
      }
    }
    if (currentPos[1] >= bottomLimit) return true;
    if (pointToString(startingPos) === pointToString(currentPos)) {
      filledPoints.add(pointToString(currentPos));
      break;
    }
  }
};

let count = 0;
while (!dropSand()) count++;
console.log(count);
