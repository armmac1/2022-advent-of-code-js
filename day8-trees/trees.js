import { dataSet } from "./dataSet.js";

const rows = dataSet.split('\n');
const dataSetSingleString = rows.join('');
const columns = rows.map((_, index) => rows.map(row => row[index]).join(''));
const totalCells = dataSetSingleString.length;

const getColumn = (i) => Math.floor(i % columns.length);
const getRow = (i) => Math.floor(i / rows.length);

const isBorder = (cellId) => {
  if (getRow(cellId) === 0 || getRow(cellId) === rows[0].length - 1) return true;
  if (getColumn(cellId) === 0 || getColumn(cellId) === columns[0].length - 1) return true;

  return false;
};

const getVisibleTreeCount = (array, condition) => {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    count++;

    if (condition(array[i])) {
      break;
    }
  }

  return count;
};

const getHorizontalTrees = (i) => {
  const row = getRow(i);
  const column = getColumn(i);
  const leftSide = rows[row].slice(0, column);
  const rightSide = rows[row].slice(column + 1);
  const currentHeight = parseInt(dataSetSingleString[i]);
  const visibleTreeCountLeftSide = getVisibleTreeCount([...leftSide].reverse(), (height) => parseInt(height) >= currentHeight);
  const visibleTreeCountRightSide = getVisibleTreeCount(rightSide, (height) => (parseInt(height) >= currentHeight));

  return {
    leftSide,
    rightSide,
    visibleTreeCountLeftSide,
    visibleTreeCountRightSide,
  };
};

const isVisibleHorizontally = (i) => {
  const currentHeight = parseInt(dataSetSingleString[i]);
  const { leftSide, rightSide } = getHorizontalTrees(i);
  const higherTreeOnLeftExists = [...leftSide].some(height => parseInt(height) >= currentHeight);
  const higherTreeOnRightExists = [...rightSide].some(height => parseInt(height) >= currentHeight);

  return !higherTreeOnLeftExists || !higherTreeOnRightExists;
};

const getVerticalTrees = (i) => {
  const row = getRow(i);
  const column = getColumn(i);
  const upSide = columns[column].slice(0, row);
  const downSide = columns[column].slice(row + 1);
  const currentHeight = parseInt(dataSetSingleString[i]);

  const visibleTreeCountUpSide = getVisibleTreeCount([...upSide].reverse(), (height) => (parseInt(height) >= currentHeight));
  const visibleTreeCountDownSide = getVisibleTreeCount(downSide, (height) => (parseInt(height) >= currentHeight));

  return {
    upSide,
    downSide,
    visibleTreeCountUpSide,
    visibleTreeCountDownSide,
  };
};

const isVisibleVertically = (i) => {
  const currentHeight = parseInt(dataSetSingleString[i]);
  const { upSide, downSide } = getVerticalTrees(i);
  const higherTreeAboveExists = [...upSide].some(height => parseInt(height) >= currentHeight);
  const higherTreeBelowExists = [...downSide].some(height => parseInt(height) >= currentHeight);

  return !higherTreeAboveExists || !higherTreeBelowExists;
};

const isTreeVisible = (i) => {
  return isVisibleHorizontally(i) || isVisibleVertically(i);
};

const getScenicScore = (i) => {
  const { visibleTreeCountDownSide, visibleTreeCountUpSide } = getVerticalTrees(i);
  const { visibleTreeCountLeftSide, visibleTreeCountRightSide } = getHorizontalTrees(i);

  return visibleTreeCountDownSide * visibleTreeCountUpSide * visibleTreeCountLeftSide * visibleTreeCountRightSide;
};

let visible = 0;
const scenicScores = [];
for (let i = 0; i < totalCells; i++) {
  if (isBorder(i) || isTreeVisible(i)) {
    scenicScores.push(getScenicScore(i));
    visible++;
  }
}