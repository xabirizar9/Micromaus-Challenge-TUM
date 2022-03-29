const MAZE_SIZE = 6;

export const testFloodFill = () => {
  const state = new Array<number>(MAZE_SIZE * MAZE_SIZE).fill(0);

  printState(state);

  const center = MAZE_SIZE / 2 - 1;
  const isMazeEven = center === Math.round(center);

  for (let i = 0; i < MAZE_SIZE; i++) {
    for (let j = 0; j < MAZE_SIZE; j++) {
      state[i * MAZE_SIZE + j] =
        Math.min(Math.abs(center - i), Math.abs(center + 1 - i)) +
        Math.min(Math.abs(center - j), Math.abs(center + 1 - j));
    }
  }

  printState(state);
};

const printState = (state: number[]) => {
  console.log("STATE");
  for (let i = 0; i < MAZE_SIZE; i++) {
    let line = "";
    for (let j = 0; j < MAZE_SIZE; j++) {
      line += `|${state[i * MAZE_SIZE + j]}`;
      if (j == MAZE_SIZE - 1) {
        console.log(`${line}${j == MAZE_SIZE - 1 ? "|" : ""}`);
      }
    }
  }
};
