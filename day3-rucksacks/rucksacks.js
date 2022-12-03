import { dataSet } from "./dataSet.js";

const isUpperCase = (letter) => letter === letter.toUpperCase();
const getPriorityScore = (letter) => isUpperCase(letter) ? letter.charCodeAt(0) - 38 : letter.charCodeAt(0) - 96;

//part 1
const rucksacks = dataSet
  .split('\n')
  .map(rucksack => ({
    firstHalf: rucksack.slice(0, rucksack.length / 2),
    secondHalf: rucksack.slice(rucksack.length / 2),
  }));

const commonItem = Object.values(rucksacks)
  .map(({ firstHalf, secondHalf }) => (
    [...firstHalf].filter(firstHalfLetter => secondHalf
      .includes(firstHalfLetter))[0]
  ));

const priorityScoreTotal = commonItem.reduce((sum, cur) => sum + getPriorityScore(cur), 0);

//part 2
const groupOfThreeRucksacks = dataSet
  .split('\n')
  .reduce((sum, cur, id) => {
    const groupIndex = Math.floor(id / 3);

    if (!sum[groupIndex]) sum[groupIndex] = [];

    sum[groupIndex].push(cur);

    return sum;
  }, []);

const badgeItems = groupOfThreeRucksacks
  .map(rucksacks => [...rucksacks[0]].filter(letter => (rucksacks[1].includes(letter) && rucksacks[2].includes(letter)))[0]);

const sumBadgeItemScore = badgeItems.reduce((sum, cur) => sum + getPriorityScore(cur), 0);