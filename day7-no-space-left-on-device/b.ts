const input = Deno.readTextFileSync("input.txt").split("\r\n");

type Directory = {
  name: string;
  parent?: Directory;
  directories: Directory[];
  files: number[];
};

const root: Directory = { directories: [], files: [], name: "/" };

let current = root;

for (const line of input) {
  if (line.startsWith("$")) {
    const args = line.split(" ")[2];
    if (args) {
      if (args === "..") {
        if (current.parent) current = current.parent;
      } else if (args === "/") {
        current = root;
      } else {
        const found = current.directories.find((d) => d.name === args);
        if (!found) {
          const newDir = {
            name: args,
            directories: [],
            files: [],
            parent: current,
          };
          current.directories.push(newDir);
          current = newDir;
        } else current = found;
      }
    }
  } else {
    if (!line.startsWith("dir")) current.files.push(Number(line.split(" ")[0]));
  }
}

const maxSize = 70000000;
const minRequired = 30000000;
const sizes: number[] = [];

const calculateSize = (dir: Directory): number => {
  let size = 0;

  for (const file of dir.files) {
    size += file;
  }

  for (const directory of dir.directories) {
    const dirSize = calculateSize(directory);
    size += dirSize;
    sizes.push(dirSize);
  }
  return size;
};

const rootSize = calculateSize(root);
const solution = Math.min(
  ...sizes.filter((a) => a >= minRequired - (maxSize - rootSize))
);
console.log(solution);
