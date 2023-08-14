import distributions from 'distributions';
// Define the outcome values and their associated probabilities
const outcomes = [
  1000, 130, 26, 9, 4, 2, 0.2, 0.2, 0.2, 0.2, 0.2, 2, 4, 9, 26, 130, 1000,
];
const probabilities = outcomes.map((prob) => prob / 100);

const binomialDist = new distributions.Discrete({ pmf: probabilities });
export const betResult = (): number => {
  const randomValue = binomialDist.random();
  return randomValue;
};
