import {FormattedBenefits} from '../components/formatCategorisedBenefits';
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
