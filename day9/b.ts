const input = Deno.readTextFileSync("input.txt").split("\r\n");

type Position = [number, number];

const headPosition: Position = [0, 0];
const tailPositions: Position[] = [
  ...new Array(9).fill([0, 0]).map(() => [0, 0] as Position),
];

const updateTail = (positions: [Position, Position]) => {
  const [head, tail] = positions;
  // Determine which direction the head is in relative to the tail
  const up = head[0] < tail[0] - 1;
  const down = head[0] > tail[0] + 1;
  const left = head[1] < tail[1] - 1;
  const right = head[1] > tail[1] + 1;

  if (up) {
    tail[0]--;
    tail[1] += head[1] > tail[1] ? 1 : head[1] < tail[1] ? -1 : 0;
  } else if (down) {
    tail[0]++;
    tail[1] += head[1] > tail[1] ? 1 : head[1] < tail[1] ? -1 : 0;
  } else if (left) {
    tail[1]--;
    tail[0] += head[0] > tail[0] ? 1 : head[0] < tail[0] ? -1 : 0;
  } else if (right) {
    tail[1]++;
    tail[0] += head[0] > tail[0] ? 1 : head[0] < tail[0] ? -1 : 0;
  }
};

const visited: Set<string> = new Set();

const movements: { [key: string]: Position } = {
  R: [0, 1],
  L: [0, -1],
  U: [-1, 0],
  D: [1, 0],
};

for (const instructions of input) {
  const direction = instructions[0],
    steps = Number(instructions.slice(1));

  const movement = movements[direction];

  for (let step = 0; step < steps; step++) {
    headPosition[0] += movement[0];
    headPosition[1] += movement[1];
    // Update first tail
    updateTail([headPosition, tailPositions[0]]);
    // Update the rest of the tails
    for (let i = 1; i < tailPositions.length; i++) {
      updateTail([tailPositions[i - 1], tailPositions[i]]);
    }
    // Add positions visited by the last tail to the set
    visited.add(tailPositions[tailPositions.length - 1].join(","));
  }
}

console.log(visited.size, visited);
