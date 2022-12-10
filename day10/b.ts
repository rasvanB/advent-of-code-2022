const input = Deno.readTextFileSync("input.txt").split("\r\n");

let x = 1;
let currentCycle = 1;
let currentRow: string[] = [];

const updateScreen = () => {
  currentRow.push(
    currentCycle - 1 === x - 1 ||
      currentCycle - 1 === x ||
      currentCycle - 1 === x + 1
      ? "█"
      : " "
  );

  if (currentCycle % 40 === 0) {
    console.log(currentRow.join(""));
    currentRow = [];
    currentCycle = 0;
  }
};

for (const instructions of input) {
  const [, args] = instructions.split(" ").map(Number);
  const numberOfCycles = args ? 2 : 1;

  for (let i = 0; i < numberOfCycles; i++) {
    updateScreen();
    currentCycle++;
  }

  x += args ? args : 0;
}
