const input = Deno.readTextFileSync("input.txt").split("\r\n");
let sum = 0;

for (const word of input) {
  const [firstHalf, secondHalf] = [
    word.slice(0, word.length / 2).split(""),
    word.slice(word.length / 2, word.length).split(""),
  ];

  const commonChar = secondHalf.find((c) => firstHalf.includes(c));

  if (commonChar)
    sum +=
      commonChar >= "a" && commonChar <= "z"
        ? commonChar.charCodeAt(0) - 96
        : commonChar.charCodeAt(0) - 38;
}
console.log(sum);
