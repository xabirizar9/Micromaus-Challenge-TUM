const MAZE_SIZE = 6;

let a = 1 << 2;

enum Direction {
  Up = 0,
  Right = 1,
  Down = 2,
  Left = 3,
}

export const testFloodFill = () => {
  const wallState = new Array<number>(MAZE_SIZE * MAZE_SIZE).fill(0);
  const state = new Array<number>(MAZE_SIZE * MAZE_SIZE).fill(-1);

  const getWall = (x: number, y: number, dir: Direction) => {
    return (wallState[y * MAZE_SIZE + x] >> dir) & 1;
  };

  const printState = (state: number[]) => {
    console.log("STATE");
    for (let x = 0; x < MAZE_SIZE; x++) {
      let line = "";
      for (let y = 0; y < MAZE_SIZE; y++) {
        line += `${getWall(x, y, Direction.Right) ? "|" : " "}${
          state[y * MAZE_SIZE + x]
        }`;
        if (y == MAZE_SIZE - 1) {
          console.log(`${line}${y == MAZE_SIZE - 1 ? "|" : ""}`);
        }
      }
    }
  };

  printState(state);

  const center = MAZE_SIZE / 2 - 1;
  const isMazeEven = center === Math.round(center);

  const setWall = (
    x: number,
    y: number,
    dir: Direction,
    setOpposing: boolean = true
  ) => {
    if (x < 0 || x >= MAZE_SIZE || y < 0 || y >= MAZE_SIZE) {
      return;
    }

    wallState[y * MAZE_SIZE + x] |= 1 << dir;

    if (setOpposing) {
      switch (dir) {
        case Direction.Up:
          setWall(x, y + 1, Direction.Down, false);
          break;
        case Direction.Right:
          setWall(x + 1, y, Direction.Left, false);
          break;
        case Direction.Down:
          setWall(x, y - 1, Direction.Up, false);
          break;
        case Direction.Left:
          setWall(x - 1, y, Direction.Right, false);
          break;
      }
    }
  };

  const set = (x: number, y: number, value: number) => {
    state[y * MAZE_SIZE + x] = value;
  };

  const get = (x: number, y: number) => {
    return state[y * MAZE_SIZE + x];
  };

  const fill = (x: number, y: number, distance: number) => {
    if (x < 0 || x >= MAZE_SIZE || y < 0 || y >= MAZE_SIZE) {
      return;
    }

    if (
      (get(x, y) === 0 && distance === 0) ||
      get(x, y) === -1 ||
      get(x, y) > distance
    ) {
      set(x, y, distance);

      if (getWall(x, y, Direction.Right) === 0) {
        fill(x + 1, y, distance + 1);
      }
      if (getWall(x, y, Direction.Left) === 0) {
        fill(x - 1, y, distance + 1);
      }
      if (getWall(x, y, Direction.Up) === 0) {
        fill(x, y + 1, distance + 1);
      }
      if (getWall(x, y, Direction.Down) === 0) {
        fill(x, y - 1, distance + 1);
      }
    }
  };

  // set start points
  set(center, center, 0);
  set(center, center + 1, 0);
  set(center + 1, center, 0);
  set(center + 1, center + 1, 0);

  //setWall(0, 0, Direction.Right);
  setWall(0, 1, Direction.Right);
  setWall(0, 2, Direction.Right);
  setWall(0, 3, Direction.Right);
  setWall(0, 4, Direction.Right);
  setWall(0, 4, Direction.Down);
  setWall(0, 5, Direction.Right);

  fill(center, center, 0);
  if (isMazeEven) {
    fill(center, center + 1, 0);
    fill(center + 1, center, 0);
    fill(center + 1, center + 1, 0);
  }

  printState(state);
};
