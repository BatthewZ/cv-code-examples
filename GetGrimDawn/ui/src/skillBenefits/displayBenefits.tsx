import {FormattedBenefits} from '../components/formatCategorisedBenefits';
import {formatBenefit} from '../formatters/formatBenefit';
import {Skill} from '../types/types';
import {categoriseBenefits} from './categoriseBenefits';
import {getBenefits, getDebuffs, reduceSkillBenefits} from './reduceSkillBenefits';

type BenefitOrDebuff = 'benefit' | 'debuff';

export function displayBenefits(skills: Skill[], benefitOrDebuff: BenefitOrDebuff = 'benefit') {
  const benefits = benefitOrDebuff === 'debuff' ? getDebuffs(skills) : getBenefits(skills);
  const reducedBenefits = reduceSkillBenefits(benefits);
  const categorisedBenefits = categoriseBenefits(reducedBenefits);
  return <FormattedBenefits cbs={categorisedBenefits} />;
}

export function displayBenefitsWithoutHeadings(skills: Skill[], benefitOrDebuff: BenefitOrDebuff = 'benefit') {
  const benefits = benefitOrDebuff === 'debuff' ? getDebuffs(skills) : getBenefits(skills);
  const reducedBenefits = reduceSkillBenefits(benefits);
  const categorisedBenefits = categoriseBenefits(reducedBenefits);

  const debuffs = [
    <>
      <strong>Debuffs</strong>
    </>,
  ];

  type cbKey = keyof typeof categorisedBenefits;

  for (const key of Object.keys(categorisedBenefits)) {
    for (const benefit of categorisedBenefits[key as cbKey]) {
      // console.log('Adding benefit: ', benefit);
      debuffs.push(
        <>
          {formatBenefit(benefit)}
          <br />
        </>
      );
    }
  }

  return debuffs;
}
