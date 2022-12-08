const input = Deno.readTextFileSync("input.txt");

let max,
  sum = 0;

for (const line of input.split("\r\n")) {
  if (line) {
    sum += Number(line);
    if (!max || max < sum) max = sum;
  } else {
    sum = 0;
  }
}

console.log("MAX: ", max);
