const input = Deno.readTextFileSync("input.txt").split("\r\n");

type range = [number, number];

const contains = (first: range, second: range) =>
  second[0] >= first[0] && second[1] <= first[1];

const total = input
  .map((line) => line.split(",").map((e) => e.split("-").map(Number) as range))
  .reduce(
    (prev, current) =>
      (prev +=
        contains(current[0], current[1]) || contains(current[1], current[0])
          ? 1
          : 0),
    0
  );

console.log(total);
