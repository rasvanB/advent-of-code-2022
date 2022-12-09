const input = Deno.readTextFileSync("input.txt").split("\r\n");
console.log(input);

type Position = [number, number];

const headPosition: Position = [5, 0];
const tailPosition: Position = [5, 0];

const updateTail = (positions: [Position, Position]) => {
  const [head, tail] = positions;
  let [left, right, up, down] = [false, false, false, false];
  if (head[0] > tail[0] + 1) down = true;
  if (head[0] < tail[0] - 1) up = true;
  if (head[1] > tail[1] + 1) right = true;
  if (head[1] < tail[1] - 1) left = true;

  if (up) {
    if (head[1] > tail[1]) {
      tail[0]--;
      tail[1]++;
    } else if (head[1] < tail[1]) {
      tail[0]--;
      tail[1]--;
    } else tail[0]--;
  }
  if (down) {
    if (head[1] > tail[1]) {
      tail[0]++;
      tail[1]++;
    } else if (head[1] < tail[1]) {
      tail[0]++;
      tail[1]--;
    } else tail[0]++;
  }
  if (left) {
    if (head[0] > tail[0]) {
      tail[0]++;
      tail[1]--;
    } else if (head[0] < tail[0]) {
      tail[0]--;
      tail[1]--;
    } else tail[1]--;
  }
  if (right) {
    if (head[0] > tail[0]) {
      tail[0]++;
      tail[1]++;
    } else if (head[0] < tail[0]) {
      tail[0]--;
      tail[1]++;
    } else tail[1]++;
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
    updateTail([headPosition, tailPosition]);
    visited.add(tailPosition.join(","));
  }
}

console.log(visited.size, visited);
