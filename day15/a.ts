console.time("t");
const input = Deno.readTextFileSync("input.txt")
  .split("\r\n")
  .map((line) =>
    line.split(":").map(
      (x) =>
        x
          .split(" at ")[1]
          .split(",")
          .map((y) => Number(y.split("=")[1])) as Point
    )
  );

type Point = [number, number];
const map = new Map<string, string>();
const pointToString = (p: Point) => p.join(",");

const getImpossibleCount = (Y: number) => {
  const can = new Set<number>();
  let minX = Infinity;
  let maxX = -Infinity;

  for (const [sensor, beacon] of map) {
    const [sx, sy] = sensor.split(",").map(Number) as Point;
    const [bx, by] = beacon.split(",").map(Number) as Point;

    const distance = Math.abs(sx - bx) + Math.abs(sy - by);
    const offset = distance - Math.abs(sy - Y);

    if (offset <= 0) continue;
    minX = Math.min(minX, sx - offset);
    maxX = Math.max(maxX, sx + offset);
    if (by == Y) can.add(bx);
  }

  return maxX - minX + 1 - can.size;
};

for (const line of input) {
  const [sensor, beacon] = line;
  map.set(pointToString(sensor), pointToString(beacon));
}

console.log(getImpossibleCount(2000000));
console.timeLog("t");
