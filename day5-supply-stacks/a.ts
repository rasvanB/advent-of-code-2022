const input = await Deno.readTextFileSync("input.txt").split("\r\n");
const matchLetter = /\[([A-Z])\]/g;

const columns: { [key: number]: string[] } = {};
for (const line of input) {
  let match: RegExpExecArray | null;
  while ((match = matchLetter.exec(line))) {
    const index = match.index / 4 + 1;
    if (!columns[index]) columns[index] = [];
    columns[index].push(match[1]);
  }
}

for (const column of Object.entries(columns)) {
  columns[Number(column[0])] = column[1].reverse();
}

for (const line of input) {
  if (line.includes("move")) {
    const [quantity, locations] = [
      Number(line.split("from")[0].split("move")[1]),
      line.split("from")[1].split("to").map(Number),
    ];
    const [from, to] = locations;

    for (let i = 0; i < quantity; i++) {
      const popped = columns[from].pop();
      if (popped) columns[to].push(popped);
    }
  }
}

console.log(
  Object.entries(columns).reduce((acc, column) => {
    return (acc += column[1].pop());
  }, "")
);
