const input = Deno.readTextFileSync("input.txt").split("\r\n");

const grid: number[][] = input.map((line) => line.split("").map(Number));

const computeScenicScore = (x: number, y: number) => {
  const treesViewed = [0, 0, 0, 0];
  for (let i = x + 1; i < grid[0].length; i++) {
    treesViewed[0]++;
    if (grid[i][y] >= grid[x][y]) break;
  }
  for (let i = x - 1; i >= 0; i--) {
    treesViewed[1]++;
    if (grid[i][y] >= grid[x][y]) break;
  }
  for (let i = y + 1; i < grid.length; i++) {
    treesViewed[2]++;
    if (grid[x][i] >= grid[x][y]) break;
  }
  for (let i = y - 1; i >= 0; i--) {
    treesViewed[3]++;
    if (grid[x][i] >= grid[x][y]) break;
  }
  return treesViewed[0] * treesViewed[1] * treesViewed[2] * treesViewed[3];
};

let max = -1;

for (const i in grid) {
  const line = grid[i];
  for (const j in line) {
    const score = computeScenicScore(Number(i), Number(j));
    if (score > max) max = score;
  }
}

console.log(max);
