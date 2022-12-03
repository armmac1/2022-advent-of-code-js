import { dataSet } from "./dataSet.js";

const SCORE_WIN = 6;
const SCORE_LOSE = 0;
const SCORE_DRAW = 3;

const SIGN_SCORES = {
  X: 1,
  Y: 2,
  Z: 3,
};

const WIN_COMBINATIONS = {
  X: 'C',
  Y: 'A',
  Z: 'B',
};

const LOSE_COMBINATIONS = {
  X: 'B',
  Y: 'C',
  Z: 'A',
};

const DRAW_COMBINATIONS = {
  X: 'A',
  Y: 'B',
  Z: 'C',
};

const splitAttacksAndCountersAttacks = dataSet.split('\n');
const allAttacks = splitAttacksAndCountersAttacks.map(splitData => splitData[0]);
const allCounters = splitAttacksAndCountersAttacks.map(splitData => splitData[2]);

const getCurrentMoveScore = (attack, counterAttack) => {
  if (WIN_COMBINATIONS[counterAttack] === attack) return SIGN_SCORES[counterAttack] + SCORE_WIN;
  if (LOSE_COMBINATIONS[counterAttack] === attack) return SIGN_SCORES[counterAttack] + SCORE_LOSE;
  if (DRAW_COMBINATIONS[counterAttack] === attack) return SIGN_SCORES[counterAttack] + SCORE_DRAW;
};

const getTotalScore = () => allAttacks.map((attack, index) => getCurrentMoveScore(attack, allCounters[index])).reduce((sum, cur) => sum + cur, 0);
