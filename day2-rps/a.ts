const input = Deno.readTextFileSync("input.txt");

let myScore = 0;

for (const line of input.split("\r\n")) {
  const [opponentChoice, myChoice] = line.split(" ");
  const [opponentChoiceScore, myChoiceScore] = [
    opponentChoice.charCodeAt(0) - 64,
    myChoice.charCodeAt(0) - 87,
  ];

  myScore += myChoiceScore;

  if (opponentChoiceScore === myChoiceScore) {
    myScore += 3;
  } else {
    if (
      (myChoiceScore === 1 && opponentChoiceScore === 3) ||
      (myChoiceScore === 2 && opponentChoiceScore === 1) ||
      (myChoiceScore === 3 && opponentChoiceScore === 2)
    ) {
      myScore += 6;
    }
  }
}
console.log(myScore);
