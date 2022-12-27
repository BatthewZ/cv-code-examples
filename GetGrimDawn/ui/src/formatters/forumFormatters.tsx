import {CategorisedBenefits, ReducedBenefit} from '../types/types';

export function formatForForums(sb: CategorisedBenefits) {
  let formattedBenefits = `GrimTools: Link\n---\n## Team Benefits Include:\n`;

  const allBenefits = [
    {benefitList: sb.oaDaCrit, title: 'OA, DA, Crit'},
    {benefitList: sb.healAndHealth, title: 'Healing and Health'},
    {benefitList: sb.damage, title: 'Damage'},
    {benefitList: sb.defensive, title: 'Defensive Buffs'},
  ];

  for (const categorisedBenefits of allBenefits) {
    if (categorisedBenefits.benefitList.length) {
      formattedBenefits += `### ${categorisedBenefits.title}\n`;
      for (const benefit of categorisedBenefits.benefitList) {
        formattedBenefits += getFormattedCombinedBenefitRowForforum(benefit);
      }
    }
  }
  console.log(formattedBenefits);
}

function getFormattedCombinedBenefitRowForforum(benefit: ReducedBenefit) {
  if (benefit.flatVal > 0 && benefit.percentageVal > 0) {
    return `- +${benefit.flatVal} + ${benefit.percentageVal}%${benefit.damageType ? ' ' + benefit.damageType : ''} ${
      benefit.type
    }\n`;
  } else {
    return ` - +${benefit.flatVal > 0 ? benefit.flatVal : benefit.percentageVal + '%'}${
      benefit.damageType ? ' ' + benefit.damageType : ''
    } ${benefit.type}\n`;
  }
}
