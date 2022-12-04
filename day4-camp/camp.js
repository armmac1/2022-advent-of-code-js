import { dataSet } from './dataSet.js';

const assignmentPairs = dataSet.split('\n').map(pair => pair.split(','));
const filterAssignments = (conditionFunc) => assignmentPairs.filter(pair => {
  const [firstMin, firstMax, secondMin, secondMax] = pair.join('-').split('-').map(num => parseInt(num));

  return conditionFunc(firstMin, firstMax, secondMin, secondMax);
});

//part1
const fullyContainedAssignments = filterAssignments(
  (firstMin, firstMax, secondMin, secondMax) => (
    (firstMin <= secondMin && firstMax >= secondMax) || (secondMin <= firstMin && secondMax >= firstMax))
).length;


//part2
const overlapingRangeCount = filterAssignments(
  (firstMin, firstMax, secondMin, secondMax) => (
    (
      (firstMax >= secondMin && secondMax >= firstMin)
      || (secondMax >= firstMin && secondMin <= firstMax)
      || (firstMin <= secondMax && secondMin <= firstMax)
      || (secondMin <= firstMax && secondMax >= firstMin)
    )
  )
).length;