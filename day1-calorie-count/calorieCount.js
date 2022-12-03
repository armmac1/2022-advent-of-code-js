import { dataSet } from "./dataSet.js";

// Part 1
const getBiggestCalorieSum = () => Math.max(...dataSet
  .split('\n\n')
  .map((dirtyCalories) => dirtyCalories
    .split('\n')
    .reduce((sumCalories, currentCalories) => sumCalories += parseInt(currentCalories, 10), 0))
);

// Part 2
console.log(
  dataSet
    .split('\n\n')
    .map((dirtyCalories) => dirtyCalories
      .split('\n')
      .reduce((sumCalories, currentCalories) => sumCalories += parseInt(currentCalories, 10), 0))
    .sort((a, b) => a - b)
    .splice(-3)
    .reduce((sum, cur) => sum += cur, 0)
);