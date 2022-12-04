import { dataSet } from './dataSet.js';

const assignmentPairs = dataSet.split('\n').map(pair => pair.split(','));

//part1
const fullyContaintainedAssignments = assignmentPairs
  .filter(pair => {
    const [firstMin, firstMax, secondMin, secondMax] = pair.join('-').split('-').map(num => parseInt(num));

    return ((firstMin <= secondMin && firstMax >= secondMax) || (secondMin <= firstMin && secondMax >= firstMax));
  })
  .reduce((sum) => sum + 1, 0);