const input = Deno.readTextFileSync("input.txt");
const regex = /^\b(?!.*(.).*\1)[a-zA-Z]{14}\b/g;

for (let i = 0; i < input.length - 3; i++) {
  const match = input.slice(i, i + 14).match(regex);
  if (match) {
    console.log(i + 14);
    break;
  }
}
