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

// Part 1
const getCurrentMoveScore = (attack, counterAttack) => {
  if (WIN_COMBINATIONS[counterAttack] === attack) return SIGN_SCORES[counterAttack] + SCORE_WIN;
  if (LOSE_COMBINATIONS[counterAttack] === attack) return SIGN_SCORES[counterAttack] + SCORE_LOSE;
  if (DRAW_COMBINATIONS[counterAttack] === attack) return SIGN_SCORES[counterAttack] + SCORE_DRAW;
};

const getTotalScore = () => allAttacks
  .map((attack, index) => getCurrentMoveScore(attack, allCounters[index]))
  .reduce((sum, cur) => sum + cur, 0);

// Part 2
const FORCED_WIN_COMBINATIONS = Object.fromEntries(Object.entries(WIN_COMBINATIONS).map(combination => combination.reverse()));
const FORCED_LOSE_COMBINATIONS = Object.fromEntries(Object.entries(LOSE_COMBINATIONS).map(combination => combination.reverse()));
const FORCED_DRAW_COMBINATIONS = Object.fromEntries(Object.entries(DRAW_COMBINATIONS).map(combination => combination.reverse()));

const EXPECT_WIN = 'Z';
const EXPECT_LOSE = 'X';
const EXPECT_DRAW = 'Y';

const getForcedOutcomeScore = (attack, expectedOutcome) => {
  if (EXPECT_WIN === expectedOutcome) return SCORE_WIN + SIGN_SCORES[FORCED_WIN_COMBINATIONS[attack]];
  if (EXPECT_LOSE === expectedOutcome) return SCORE_LOSE + SIGN_SCORES[FORCED_LOSE_COMBINATIONS[attack]];
  if (EXPECT_DRAW === expectedOutcome) return SCORE_DRAW + SIGN_SCORES[FORCED_DRAW_COMBINATIONS[attack]];
};

const getForcedTotalScore = () => allAttacks
  .map((attack, index) => getForcedOutcomeScore(attack, allCounters[index]))
  .reduce((sum, cur) => sum + cur, 0);