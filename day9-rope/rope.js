import { dataSet } from './dataSet.js';

const tailLength = 9;
const rope = new Array(tailLength + 1).fill(null).map(() => ({ x: 0, y: 0 }));
const uniqueTailPositions = new Set();

const isTopRight = (xDiff, yDiff) => (xDiff >= 1 && yDiff >= 1 && !(xDiff === 1 && yDiff === 1));
const isTopLeft = (xDiff, yDiff) => ((xDiff <= -1 && yDiff >= 1 && !(xDiff === -1 && yDiff === 1)));
const isBottomRight = (xDiff, yDiff) => ((xDiff >= 1 && yDiff <= -1 && !(xDiff === 1 && yDiff === -1)));
const isBottomLeft = (xDiff, yDiff) => ((xDiff <= -1 && yDiff <= -1 && !(xDiff === -1 && yDiff === -1)));
const isLeft = (xDiff) => xDiff === -2;
const isTop = (yDiff) => yDiff === 2;
const isRight = (xDiff) => xDiff === 2;
const isBottom = (yDiff) => yDiff === -2;

const getPositionString = (knot) => `x:${knot.x};Y:${knot.y}`;
uniqueTailPositions.add(getPositionString(rope[0]));

const moveHead = (direction, steps) => {
  for (let i = 0; i < steps; i++) {
    if (direction === 'R') rope[0].x += 1;
    if (direction === 'L') rope[0].x -= 1;
    if (direction === 'U') rope[0].y += 1;
    if (direction === 'D') rope[0].y -= 1;

    for (let j = 0; j < tailLength; j++) {
      const yDiff = rope[j].y - rope[j + 1].y;
      const xDiff = rope[j].x - rope[j + 1].x;

      if (isTopRight(xDiff, yDiff)) {
        rope[j + 1].x++;
        rope[j + 1].y++;
      } else if (isTopLeft(xDiff, yDiff)) {
        rope[j + 1].x--;
        rope[j + 1].y++;
      } else if (isBottomLeft(xDiff, yDiff)) {
        rope[j + 1].x--;
        rope[j + 1].y--;
      } else if (isBottomRight(xDiff, yDiff)) {
        rope[j + 1].x++;
        rope[j + 1].y--;
      } else if (isRight(xDiff)) {
        rope[j + 1].x++;
      } else if (isLeft(xDiff)) {
        rope[j + 1].x--;
      } else if (isTop(yDiff)) {
        rope[j + 1].y++;
      } else if (isBottom(yDiff)) {
        rope[j + 1].y--;
      };
    }

    uniqueTailPositions.add(getPositionString(rope[rope.length - 1]));
  }
};


dataSet.split('\n').forEach((move) => {
  const splitMove = move.split(' ');
  const direction = splitMove[0];
  const steps = parseInt(splitMove[1]);

  moveHead(direction, steps);
});

//part1 & part2
//uniqueTailPositions.size;