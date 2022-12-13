const input = Deno.readTextFileSync("input.txt").split("\r\n");

type Base = number | number[];
type Packet = Base | Base[];

const comparePair = (a: Packet, b: Packet): string | undefined => {
  if (typeof a === "number" && typeof b === "number") {
    if (a < b) return "smaller";
    if (a > b) return "bigger";
    return "continue";
  }

  if (Array.isArray(a) && !Array.isArray(b)) return comparePair(a, [b]);
  if (!Array.isArray(a) && Array.isArray(b)) return comparePair([a], b);

  if (!a) return "smaller";
  if (!b) return "bigger";

  if (Array.isArray(a) && Array.isArray(b)) {
    const len = Math.min(a.length, b.length);
    for (let i = 0; i < len; i++) {
      const result = comparePair(a[i], b[i]);
      if (result !== "continue") return result;
    }
    if (a.length > b.length) return "bigger";
    if (a.length < b.length) return "smaller";
    return "continue";
  }
};

const lines = [[[2]], [[6]]];

for (let i = 0; i < input.length; i += 3) {
  const [line1, line2] = input.slice(i, i + 2).map((line) => JSON.parse(line));
  lines.push(line1, line2);
}

const sortedLines = lines.sort((a, b) => {
  const result = comparePair(a, b);
  if (result === "smaller") return -1;
  if (result === "bigger") return 1;
  return 0;
});

let firstPacketIndex = 0;
let lastPacketIndex = 0;

for (const index in sortedLines) {
  const line = sortedLines[index];
  if (JSON.stringify(line) === "[[2]]") {
    firstPacketIndex = Number(index);
  } else if (JSON.stringify(line) === "[[6]]") {
    lastPacketIndex = Number(index);
    break;
  }
}
console.log((lastPacketIndex + 1) * (firstPacketIndex + 1));
