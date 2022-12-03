import { dataSet } from "./dataSet.js";

const calorieSums = dataSet
  .split('\n\n')
  .map((dirtyCalories) => dirtyCalories
    .split('\n')
    .reduce((sumCalories, currentCalories) => sumCalories += parseInt(currentCalories, 10), 0));

// Part 1
const getBiggestCalorieSum = Math.max(...calorieSums);

// Part 2
const getTop3Sum = calorieSums
  .sort((a, b) => a - b)
  .splice(-3)
  .reduce((sum, cur) => sum += cur, 0);