const input = Deno.readTextFileSync("input.txt").split("\r\n");

let x = 1;
let currentCycle = 1;
let currentRow: string[] = [];

const updateScreen = () => {
  if (
    currentCycle - 1 === x - 1 ||
    currentCycle - 1 === x ||
    currentCycle - 1 === x + 1
  )
    currentRow.push("#");
  else currentRow.push(" ");

  if (currentCycle % 40 === 0) {
    console.log(currentRow.join(""));
    currentRow = [];
    currentCycle = 0;
  }
};

for (const instructions of input) {
  const [, args] = instructions.split(" ").map(Number);

  if (args) {
    for (let i = 0; i < 2; i++) {
      updateScreen();
      currentCycle++;
    }
    x += args;
  } else {
    updateScreen();
    currentCycle++;
  }
}
