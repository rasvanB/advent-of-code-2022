const input = Deno.readTextFileSync("input.txt").split("\r\n");
let sum = 0;

for (let i = 2; i < input.length; i += 3) {
  const [first, second, third] = input.slice(i - 2, i + 1);

  const commonChar = first
    .split("")
    .find((c) => second.split("").includes(c) && third.split("").includes(c));

  if (commonChar)
    sum +=
      commonChar >= "a" && commonChar <= "z"
        ? commonChar.charCodeAt(0) - 96
        : commonChar.charCodeAt(0) - 38;
}
console.log(sum);
