import {ReducedBenefit} from '../types/types';

export function formatBenefit(reducedBenefit: ReducedBenefit) {
  const dmgType = reducedBenefit.damageType ? reducedBenefit.damageType + ' ' : ' ';

  let flatVal =
    reducedBenefit.flatVal < 0
      ? `${reducedBenefit.flatVal} `
      : reducedBenefit.flatVal > 0
      ? `+${reducedBenefit.flatVal}`
      : '';
  let reducedVal = reducedBenefit.reducedVal > 0 ? ` + ${reducedBenefit.reducedVal} Reduced Target's ` : '';
  let percentageVal =
    reducedBenefit.percentageVal < 0
      ? `${reducedBenefit.percentageVal}% `
      : reducedBenefit.percentageVal > 0
      ? `+${reducedBenefit.percentageVal}% `
      : '';

  let reducedPercentageVal =
    reducedBenefit.reducedPercentageVal > 0 ? ` +${reducedBenefit.reducedPercentageVal}% Reduced Target's ` : '';

  if (reducedBenefit.type === 'Impaired Aim' || reducedBenefit.type === 'Fumble') {
    return `+ ${reducedBenefit.reducedPercentageVal}% ${reducedBenefit.type}`;
  }

  return `${flatVal}${percentageVal}${reducedVal}${reducedPercentageVal}${dmgType}${reducedBenefit.type}`;
}
