export function rollD20(modifier = 0) {
  const roll = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
  return {
    modifier: modifier,
    roll: roll,
    total: modifier + roll,
  };
}
