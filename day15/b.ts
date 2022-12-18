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

const findBeacon = (Y: number) => {
  const can = new Set<number>();
  const intervals: number[][] = [];
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
    intervals.push([sx - offset, sx + offset]);
    if (by == Y) can.add(bx);
  }

  intervals.sort((a, b) => a[0] - b[0]);
  let prevEnd = minX - 1;
  for (const interval of intervals) {
    if (interval[0] > prevEnd + 1) {
      return prevEnd + 1;
    }
    prevEnd = Math.max(prevEnd, interval[1]);
  }
};

for (const line of input) {
  const [sensor, beacon] = line;
  map.set(pointToString(sensor), pointToString(beacon));
}

for (let i = 0; i <= 4000000; i++) {
  const result = findBeacon(i);
  if (result) {
    console.log(result * 4000000 + i);
    break;
  }
}

console.timeLog("t");
