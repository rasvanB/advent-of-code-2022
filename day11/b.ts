const input = Deno.readTextFileSync("input.txt").split("\r\n");

type Monkey = {
  items: number[];
  operator: string;
  operand: string | number;
  divisionNumber: number;
  trueMonkey: number;
  falseMonkey: number;
  timesInspected?: number;
};

const monkeys: Monkey[] = [];

for (let i = 0; i < input.length; i += 7) {
  const lines = input.slice(i, i + 7);

  const startingItems = lines[1]
    .split("  Starting items: ")[1]
    .split(", ")
    .map(Number);

  const operation = lines[2].split("  Operation: ")[1].split(" = ")[1];
  const operator = operation[4];
  let operand: number | string = operation.slice(5).trim();

  if (operand !== "old") {
    operand = Number(operand);
  }

  const divisionNumber = Number(lines[3].split("divisible by ")[1]);
  const trueMonkey = Number(lines[4].slice(-1));
  const falseMonkey = Number(lines[5].slice(-1));
  monkeys.push({
    items: startingItems,
    operator,
    operand,
    divisionNumber,
    trueMonkey,
    falseMonkey,
    timesInspected: 0,
  });
}

const globalMod = monkeys.reduce((a, b) => a * b.divisionNumber, 1);

const playRoud = () => {
  for (const monkey of monkeys) {
    monkey.timesInspected! += monkey.items.length;
    for (const item of monkey.items) {
      let worryLevel = item;

      if (monkey.operator === "+") {
        if (typeof monkey.operand === "string") {
          worryLevel += item;
        } else {
          worryLevel += monkey.operand;
        }
      } else {
        if (typeof monkey.operand === "string") {
          worryLevel *= item;
        } else {
          worryLevel *= monkey.operand;
        }
      }

      worryLevel = worryLevel % globalMod;

      if (worryLevel % monkey.divisionNumber === 0) {
        monkeys[monkey.trueMonkey].items.push(worryLevel);
      } else {
        monkeys[monkey.falseMonkey].items.push(worryLevel);
      }
    }
    monkey.items = [];
  }
};

for (let i = 0; i < 10000; i++) playRoud();

const topMonkeys = monkeys
  .sort((a, b) => b.timesInspected! - a.timesInspected!)
  .slice(0, 2);
console.log(topMonkeys[0].timesInspected! * topMonkeys[1].timesInspected!);
