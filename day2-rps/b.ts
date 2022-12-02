const input = Deno.readTextFileSync("input.txt");

let myScore = 0;

for (const line of input.split("\r\n")) {
  const [opponentChoice, outcome] = line.split(" ");
  const opponentChoiceScore = opponentChoice.charCodeAt(0) - 64;
  let [losingChoiceScore, winningChoiceScore] = [0, 0];

  switch (opponentChoiceScore) {
    case 1:
      losingChoiceScore = 3;
      winningChoiceScore = 2;
      break;
    case 2:
      losingChoiceScore = 1;
      winningChoiceScore = 3;
      break;
    case 3:
      losingChoiceScore = 2;
      winningChoiceScore = 1;
      break;
    default:
      break;
  }

  switch (outcome) {
    case "X":
      myScore += losingChoiceScore;
      break;
    case "Y":
      myScore += opponentChoiceScore;
      myScore += 3;
      break;
    case "Z":
      myScore += winningChoiceScore;
      myScore += 6;
      break;
    default:
      break;
  }
}

console.log(myScore);
