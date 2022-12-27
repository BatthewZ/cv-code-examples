import {ReducedBenefit, Skill, SkillBenefit} from '../types/types';

export function getBenefits(skills: Skill[]) {
  const benefits: SkillBenefit[] = [];
  for (const skill of skills) benefits.push(...skill.benefits);

  return benefits;
}

export function getDebuffs(skills: Skill[]) {
  const debuffs: SkillBenefit[] = [];
  for (const skill of skills) debuffs.push(...skill.debuffs);

  return debuffs;
}

export function reduceSkillBenefits(benefits: SkillBenefit[]) {
  const cb: ReducedBenefit[] = [];
  for (const benefit of benefits) {
    // Try to find benefit type (and damage type). If it doesn't exist, add it.
    const found = cb.find((b) => {
      if (b.type !== benefit.benefitType) {
        return;
      }

      if (benefit.benefitType === 'Damage' || benefit.benefitType === 'Resistance') {
        if (b.damageType !== benefit.damageType) {
          return;
        }
      }
      return b;
    });

    if (!found) {
      cb.push({
        flatVal: benefit.numType === 'Flat' ? benefit.value : 0,
        percentageVal: benefit.numType === '%' ? benefit.value : 0,
        reducedVal: benefit.numType === 'Reduced' ? benefit.value : 0,
        reducedPercentageVal: benefit.numType === 'Reduced%' ? benefit.value : 0,
        type: benefit.benefitType,
        damageType: benefit.damageType,
      });
    } else {
      if (benefit.numType === 'Flat') {
        found.flatVal += benefit.value;
      }
      if (benefit.numType === '%') {
        found.percentageVal += benefit.value;
      }
      if (benefit.numType === 'Reduced') {
        found.reducedVal = found.reducedVal >= benefit.value ? found.reducedVal : benefit.value;
      }

      if (benefit.numType === 'Reduced%') {
        found.reducedPercentageVal =
          found.reducedPercentageVal >= benefit.value ? found.reducedPercentageVal : benefit.value;
      }
    }
  }
  return cb.sort((a, b) => {
    // If the type is the same, sort by damagetype. Otherwise,
    // sort by type.
    if (a.type === b.type && a.damageType && b.damageType) {
      return a.damageType > b.damageType ? 1 : -1;
    }
    return a.type > b.type ? 1 : -1;
  });
}
