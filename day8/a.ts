const input = Deno.readTextFileSync("input.txt").split("\r\n");

const grid: number[][] = input.map((line) => line.split("").map(Number));

const isVisible = (x: number, y: number) => {
  if (x <= 0 || x >= grid[0].length) return true;
  if (y <= 0 || y >= grid.length) return true;

  const valid = [false, false, false, false];
  for (let i = x + 1; i < grid[0].length; i++) {
    if (grid[i][y] >= grid[x][y]) {
      valid[0] = true;
      break;
    }
  }
  for (let i = x - 1; i >= 0; i--) {
    if (grid[i][y] >= grid[x][y]) {
      valid[1] = true;
      break;
    }
  }
  for (let i = y + 1; i < grid.length; i++) {
    if (grid[x][i] >= grid[x][y]) {
      valid[2] = true;
      break;
    }
  }
  for (let i = y - 1; i >= 0; i--) {
    if (grid[x][i] >= grid[x][y]) {
      valid[3] = true;
      break;
    }
  }
  if (valid[0] && valid[1] && valid[2] && valid[3]) return false;
  return true;
};

let sum = 0;

for (const i in grid) {
  const line = grid[i];
  for (const j in line) {
    sum += isVisible(Number(i), Number(j)) ? 1 : 0;
  }
}
console.log(sum);
