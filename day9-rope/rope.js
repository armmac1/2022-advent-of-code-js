import { dataSet } from './dataSet.js';

const X = 0;
const Y = 1;
const headPosition = [0, 0];
const lastHeadPosition = [0, 0];
const tailPosition = [0, 0];
const uniqueTailPositions = new Set();

const getDistance = () => {
  const diffX = headPosition[X] - tailPosition[X];
  const diffY = headPosition[Y] - tailPosition[Y];

  return Math.sqrt(diffX * diffX + diffY * diffY);
};

const getPositionString = (position) => `x:${position[0]};Y:${position[1]}`;
uniqueTailPositions.add(getPositionString(tailPosition));

const moveHead = (direction, steps) => {
  for (let i = 0; i < steps; i++) {
    lastHeadPosition[X] = headPosition[X];
    lastHeadPosition[Y] = headPosition[Y];

    if (direction === 'R') headPosition[X] += 1;
    if (direction === 'L') headPosition[X] -= 1;
    if (direction === 'U') headPosition[Y] += 1;
    if (direction === 'D') headPosition[Y] -= 1;

    if (getDistance() > 1.5) {
      tailPosition[X] = lastHeadPosition[X];
      tailPosition[Y] = lastHeadPosition[Y];
      uniqueTailPositions.add(getPositionString(tailPosition));
    };
  }
};


dataSet.split('\n').forEach((move) => {
  const splitMove = move.split(' ');
  const direction = splitMove[0];
  const steps = parseInt(splitMove[1]);

  moveHead(direction, steps);
});

//part1
const part1 = uniqueTailPositions.size;