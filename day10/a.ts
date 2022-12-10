const input = Deno.readTextFileSync("input.txt").split("\r\n");

let x = 1;
let currentCycle = 1;
let total = 0;

for (const instructions of input) {
  const [, args] = instructions.split(" ").map(Number);

  if (args) {
    for (let i = 0; i < 2; i++) {
      if ((currentCycle - 20) % 40 === 0) total += currentCycle * x;
      currentCycle++;
    }
    x += args;
  } else {
    if ((currentCycle - 20) % 40 === 0) total += currentCycle * x;
    currentCycle++;
    continue;
  }
}

console.log(total);
