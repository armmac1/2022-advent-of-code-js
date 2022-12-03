import { dataSet } from "./dataSet.js";

export const getBiggestCalorieSum = () => Math.max(...dataSet
  .split('\n\n')
  .map((dirtyCalories) => dirtyCalories
    .split('\n')
    .reduce((sumCalories, currentCalories) => sumCalories += parseInt(currentCalories, 10), 0))
);