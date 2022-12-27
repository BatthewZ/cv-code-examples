import {BenefitType, SkillBenefit, SpeedType} from '../types/types';

export function flatOrPercentage(infoRow: string) {
  return infoRow.includes('%') ? '%' : 'Flat';
}

export function makeSkillBenefit(infoRow: string, benefitType: BenefitType | SpeedType): SkillBenefit {
  return {
    numType: flatOrPercentage(infoRow),
    value: extractValue(infoRow),
    benefitType: benefitType,
  };
}

export function extractValue(infoRow: string): number {
  return +infoRow.split(' ')[0].replaceAll('%', '').replaceAll('+', '').trim();
}

export function getSpeedType(infoRow: string): SpeedType {
  if (infoRow.includes('Total')) return 'Total Speed';

  if (infoRow.includes('Casting')) return 'Casting Speed';

  if (infoRow.includes('Movement')) return 'Movement Speed';

  return 'Attack Speed';
}

export function makeArmorBenefit(infoRow: string): SkillBenefit {
  const numType = flatOrPercentage(infoRow);

  // Extract armor value from: '+105 Armor' or 'Increases Armor by 24%'
  let value = 0;
  if (numType === '%') {
    const splitRow = infoRow.split(' ');
    value = +splitRow[splitRow.length - 1].replaceAll('%', '');
  } else {
    value = extractValue(infoRow);
  }
  return {
    numType: numType,
    value: value,
    benefitType: 'Armor',
  };
}
