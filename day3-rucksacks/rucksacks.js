import { dataSet } from "./dataSet.js";

const isUpperCase = (letter) => letter === letter.toUpperCase();

const rucksacks = dataSet
  .split('\n')
  .map(rucksack => ({
    firstHalf: rucksack.slice(0, rucksack.length / 2),
    secondHalf: rucksack.slice(rucksack.length / 2),
  }));

const getPriorityScore = (letter) => isUpperCase(letter) ? letter.charCodeAt(0) - 38 : letter.charCodeAt(0) - 96;

const commonItem = Object.values(rucksacks)
  .map(({ firstHalf, secondHalf }) => (
    [...firstHalf].filter(firstHalfLetter => secondHalf
      .includes(firstHalfLetter))[0]
  ));

//part 1
const priorityScoreTotal = commonItem.reduce((sum, cur) => sum + getPriorityScore(cur), 0);

