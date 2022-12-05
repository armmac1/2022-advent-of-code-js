import { dataSet } from "./dataSet.js";
const splitDataSet = dataSet.split('\n\n');
const crateStackCount = parseInt(splitDataSet[0].slice(-4));
const moves = splitDataSet[1];

// Build Stacks
const crates = splitDataSet[0].split('\n').reduce((arr, cur, index) => {
  const newIndex = index % crateStackCount;

  if (!arr[newIndex]) arr[newIndex] = [];

  arr[newIndex].push(cur.match(/.{4}/g));

  return arr;
}, []).reverse().flatMap(crate => crate);

// format dataSet into crate stacks
const stacks = crates
  .map((_, index) => crates
    .filter((_, index) => index !== 0)
    .map(crate => {
      return crate[index];
    })
  )
  .map(stack => stack.filter(e => e !== '    '));;

const moveAmountTo = (from, to, amount) => {
  for (let i = 0; i < amount; i++) {
    to.push(from.pop());
  }
};

moves.split('\n').forEach(move => {
  const [amount, from, to] = move.match(/\d+/g);
  moveAmountTo(stacks[from - 1], stacks[to - 1], amount);
});

//part1
const answer = stacks.map(stack => stack.at(-1)).join('');