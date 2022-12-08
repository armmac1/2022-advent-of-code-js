import { dataSet } from "./dataSet.js";

const outputLines = dataSet.split('\n');
const outputLineCount = outputLines.length;

const isCommand = (str) => str.startsWith('$');
const isFile = (str) => !isNaN(parseInt(str.split(' ')));
const isDirectory = (str) => str.startsWith('dir');

const isChangeDirectoryCommand = (str) => str.split(' ')[1] === 'cd';
const isListDirectoryCommand = (str) => str.split(' ')[1] === 'ls';

let currentDirectory = null;
let currentDirectory2 = null;
const changeDirectory = (newDir) => {
  newDir = newDir.split(' ');
  // initial
  if (currentDirectory !== null && newDir[2] !== '..') {
    const newPath = currentDirectory.path + `${newDir[2]}/`;
    currentDirectory = {
      path: newPath,
      dir: newDir[2],
    };

    currentDirectory2 = {
      ...currentDirectory2,
      currentDir: newPath,
      [newPath]: currentDirectory2[newPath] || { size: 0, files: [], dirs: [] },
    };

  }

  if (currentDirectory !== null && newDir[2] === '..') {
    const path = { ...currentDirectory }.path.split('/');
    path.splice(-2, 2);
    const newPath = path.length === 0 ? '/' : path.join('/') + "/";
    currentDirectory = {
      path: newPath,
      dir: newDir[2],
    };

    currentDirectory2 = {
      ...currentDirectory2,
      currentDir: newPath,
    };
  }

  if (currentDirectory === null && newDir[2] !== '..') {
    currentDirectory = {
      path: newDir[2],
      dir: newDir[2],
    };

    currentDirectory2 = {
      currentDir: '/',
      ['/']: { size: 0, files: [], dirs: [] },
    };
  }
  // console.log(currentDirectory);
};

const addFileAndCalcSize = (line) => {
  const fileSize = parseInt(line.split(' ')[0]);
  const { currentDir } = currentDirectory2;

  currentDirectory2 = {
    ...currentDirectory2,
    [currentDir]: {
      ...currentDirectory2[currentDir],
      size: currentDirectory2[currentDir].size + fileSize,
      files: [...currentDirectory2[currentDir].files, line],
    }
  };
};

const addDirectory = (line) => {
  const dir = line.split(' ')[1];
  const { currentDir } = currentDirectory2;


  currentDirectory2 = {
    ...currentDirectory2,
    [currentDir]: {
      ...currentDirectory2[currentDir],
      dirs: [...currentDirectory2[currentDir].dirs, dir],
    }
  };
};

const directories = {};
for (let i = 0; i < outputLineCount - 1; i++) {
  const line = outputLines[i];

  if (isCommand(line)) {
    if (isChangeDirectoryCommand(line)) {
      changeDirectory(line);
    }
  }

  if (isFile(line)) {
    addFileAndCalcSize(line);
  }

  if (isDirectory(line)) {
    addDirectory(line);
  }


  // is file? yes - add size to current directory

}
// const totalSumOfUnder100k = Object.values(currentDirectory2).filter(({ size }) => (size <= 100000)).reduce((sum, { size }) => sum + size, 0);
// console.log(totalSumOfUnder100k);

console.log(Object.keys(currentDirectory2));
// console.log(currentDirectory2['/gwnwqcgq/hrj/dfdtszr/']);.

// 1705869