const input = Deno.readTextFileSync("input.txt").split("\r\n");
const grid = input.map((row) => row.split(""));

type Pos = [number, number];

const height = grid.length;
const width = grid[0].length;

let startingPos: Pos = [0, 0];
let endPos: Pos = [0, 0];
const visited: Set<string> = new Set();

for (const i in grid) {
  for (const j in grid[i]) {
    if (grid[i][j] === "S") startingPos = [Number(i), Number(j)];
    if (grid[i][j] === "E") endPos = [Number(i), Number(j)];
  }
}

const getElevationFromChar = (char: string) => {
  if (!char) return 0;
  if (char === "S") return 1;
  if (char === "E") return 26;
  return char[0].charCodeAt(0) - 96;
};

const directions = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
};

const getPossibleMoves = (pos: Pos) => {
  const currentChar = grid[pos[0]][pos[1]];
  const elevation = getElevationFromChar(currentChar);
  const possibleMoves = [];

  for (const move of Object.values(directions)) {
    const movePos = [move[0] + pos[0], move[1] + pos[1]];
    const char = grid[movePos[0]]?.[movePos[1]];
    const moveElevation = getElevationFromChar(char);

    if (moveElevation <= elevation + 1) {
      if (
        movePos[0] >= 0 &&
        movePos[0] < height &&
        movePos[1] >= 0 &&
        movePos[1] < width
      )
        possibleMoves.push(movePos);
    }
  }
  return possibleMoves;
};

const queue: [Pos, number][] = [[startingPos, 0]];
visited.add(startingPos.join(","));

while (queue.length) {
  const [pos, steps] = queue.shift()!;

  if (pos[0] === endPos[0] && pos[1] === endPos[1]) {
    console.log(steps, "FOUND", pos);
    break;
  }

  for (const move of getPossibleMoves(pos)) {
    const moveKey = move.join(",");

    if (!visited.has(moveKey)) {
      queue.push([move as Pos, steps + 1]);
      visited.add(moveKey);
    }
  }
}
