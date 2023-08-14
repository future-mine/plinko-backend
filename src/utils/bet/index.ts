const outcomes: number[] = [
  1000, 130, 26, 9, 4, 2, 0.2, 0.2, 0.2, 0.2, 0.2, 2, 4, 9, 26, 130, 1000,
];
function generateBinomialRandom(p, n) {
  let successes = 0;
  for (let i = 0; i < n; i++) {
    if (Math.random() < p) {
      successes++;
    }
  }
  return successes / n;
}

export const simulatePlinkoDrop = (): number[] => {
  const probabilityOfSuccess = 0.5; // Probability of success
  const numTrials = 1000; // Number of trials

  const randomValue = generateBinomialRandom(probabilityOfSuccess, numTrials);
  const index = Math.floor(randomValue * outcomes.length);
  return [outcomes[index], index];
};
