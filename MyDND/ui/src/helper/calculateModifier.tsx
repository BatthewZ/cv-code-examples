export function calcModifier(val: string): number {
  const value = +val;
  if (value === 10) return 0;
  if (value === 0) return -5;

  if (value > 10) {
    let modifier = 0;
    for (let i = 10; i < value; i++) {
      if ((i + 1) % 2 === 0) {
        modifier++;
      }
    }
    return modifier;
  }

  if (value < 10) {
    let modifier = 0;
    const remainder = 10 - value;
    for (let i = 0; i < remainder; i++) {
      if (i % 2 === 0) {
        modifier++;
      }
    }
    return 0 - modifier;
  }

  return 0;
}

function oldCalcMod(val: string) {
  const value = +val;
  if (+val === 10) return 0;
  //   const mod = +((+val - 10) / 2).toFixed(0);
  let modString = (+val - 10) / 2 + '';
  modString = modString.includes('.') ? modString.split('.')[0] : modString;
  return +modString;
}
