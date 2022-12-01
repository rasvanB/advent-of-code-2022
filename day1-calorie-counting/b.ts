const input = Deno.readTextFileSync("input.txt");

let sum = 0;
const top: number[] = [];

for (const line of input.split("\r\n")) {
  if (line) {
    sum += Number(line);
  } else {
    if (!top.length) top.push(sum);
    else {
      for (const element of top) {
        if (element < sum) {
          top.push(sum);
          break;
        }
      }
    }
    sum = 0;
  }
}

const topThree = top.sort((a, b) => b - a).slice(0, 3);

console.log("TOP THREE: ", topThree);
console.log(
  "TOP THREE SUM: ",
  topThree.reduce((a, b) => a + b, 0)
);
