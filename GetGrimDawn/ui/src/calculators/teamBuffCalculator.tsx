import {Skill, SkillBenefit} from '../types/types';

export function createBenefitSummary(skills: Skill[] | undefined): SkillBenefit[] {
  const summary: SkillBenefit[] = [];

  if (!skills) return summary;

  for (const sk of skills) {
    for (const benefit of sk.benefits) {
      // if it DOESN'T exist, add it to summary. If it DOES exist, summaryItem.value += benefit.value;
      const found = summary.find((summaryElem) => {
        if (summaryElem.benefitType !== benefit.benefitType) {
          return;
        }

        if (summaryElem.numType !== benefit.numType) {
          return;
        }

        if (benefit.benefitType === 'Damage' || benefit.benefitType === 'Resistance') {
          if (summaryElem.damageType !== benefit.damageType) {
            return;
          }
        }
        // By this time, it should be found.
        return summaryElem;
      });

      if (!found) {
        summary.push({
          numType: benefit.numType,
          value: benefit.value,
          benefitType: benefit.benefitType,
          damageType: benefit.damageType,
        });
      } else {
        found.value += benefit.value;
      }
    }
  }

  // console.log('--- SUMMARY FOR: ');
  // console.log(summary);

  return summary;
}

export function healingSkillsSummary(healingSkills: Skill[] = []): filteredSkillsAndBenefits {
  const healSkills: Skill[] | undefined = healingSkills.filter((skill) => {
    for (const benefit of skill.benefits) {
      if (benefit.benefitType.includes('Heal') || benefit.benefitType.includes('Lifesteal')) {
        return skill;
      }
    }
  });

  const benefits = createBenefitSummary(healSkills).filter(
    (benefit) => benefit.benefitType.includes('Heal') || benefit.benefitType.includes('Lifesteal')
  );

  return {skills: healSkills, benefits: benefits};
}

export type filteredSkillsAndBenefits = {
  skills: Skill[];
  benefits: SkillBenefit[];
};
