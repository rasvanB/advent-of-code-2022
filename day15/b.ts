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
const map = new Map<string, number>();

const pointToString = (p: Point) => p.join(",");

const distanceBetween = (a: Point, b: Point) =>
  Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);

const findBeacon = (Y: number) => {
  const intervals: number[][] = [];
  let minX = Infinity;
  let maxX = -Infinity;
  for (const [sensor, distance] of map) {
    const [sx, sy] = sensor.split(",").map(Number) as Point;
    const offset = distance - Math.abs(sy - Y);

    if (offset <= 0) continue;
    const interval = [sx - offset, sx + offset];
    minX = Math.min(minX, interval[0]);
    maxX = Math.max(maxX, interval[1]);
    intervals.push(interval);
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
  map.set(pointToString(sensor), distanceBetween(sensor, beacon));
}

for (let i = 0; i <= 4000000; i++) {
  const result = findBeacon(i);
  if (result) {
    console.log(result * 4000000 + i);
    break;
  }
}

console.timeLog("t");
