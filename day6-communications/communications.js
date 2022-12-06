import { dataSet } from "./dataSet.js";
const messageLength = dataSet.length;

//part1
const getCharCountBeforeMarker = () => {
  for (let i = 3; i < messageLength - 4; i++) {
    const fourCharacters = [...dataSet.slice(i - 3, i + 1)];
    if ([...new Set(fourCharacters)].length === 4) {
      return i + 1;
    }
  }
};
