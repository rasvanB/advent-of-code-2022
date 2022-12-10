const input = Deno.readTextFileSync("input.txt").split("\r\n");

let x = 1;
let currentCycle = 1;
let total = 0;

for (const instructions of input) {
  const [, args] = instructions.split(" ").map(Number);
  const numberOfCycles = args ? 2 : 1;

  for (let i = 0; i < numberOfCycles; i++) {
    if ((currentCycle - 20) % 40 === 0) total += currentCycle * x;
    currentCycle++;
  }

  x += args ? args : 0;
}

console.log(total);
