import {SkillBenefit} from '../types/types';

export function calcHealingBenefits(infoRow: string): SkillBenefit[] {
  const healingBenefits: SkillBenefit[] = [];

  if (infoRow.includes('Health Restored')) {
    healingBenefits.push({
      numType: '%',
      value: +infoRow.split('%')[0],
      benefitType: 'Health Restored',
    });

    if (infoRow.includes('% + ') || infoRow.includes('%+')) {
      healingBenefits.push(getFlatHealthRestoredSkillBenefit(infoRow));
    }
  }
  if (infoRow.includes('Health Regenerated')) {
    healingBenefits.push({
      numType: 'Flat',
      value: +infoRow.split(' ')[0].replaceAll('+', ''),
      benefitType: 'Health Regen',
    });
  }

  if (infoRow.includes('Health Regeneration by')) {
    healingBenefits.push({
      numType: '%',
      value: +infoRow.split('Regeneration by ')[1].replaceAll('%', ''),
      benefitType: 'Health Regen',
    });
  }
  // if (healingBenefits.length) {
  //   console.log(healingBenefits);
  // }
  return healingBenefits;
}

export function getHealingEffectsIncreasedSkillBenefit(infoRow: string): SkillBenefit {
  return {
    numType: '%',
    value: +infoRow.split('by ')[1].replaceAll('%', ''),
    benefitType: 'Healing Increase',
  };
}

function getFlatHealthRestoredSkillBenefit(infoRow: string): SkillBenefit {
  let num: number = 0;
  if (infoRow.includes('% + ')) {
    num = +infoRow.split('% + ')[1].split(' ')[0];
  } else if (infoRow.includes('%+')) {
    num = +infoRow.split('%+')[1].split(' ')[0];
  }

  return {
    numType: 'Flat',
    value: num,
    benefitType: 'Health Restored',
  };
}
