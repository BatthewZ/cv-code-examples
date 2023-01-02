import {makeDmgOrResSkillBenefit} from '../calculators/CalcDmgOrRes';
import {calcHealingBenefits, getHealingEffectsIncreasedSkillBenefit} from '../calculators/CalcHealing';
import {makeSkillBenefit, getSpeedType, makeArmorBenefit} from '../calculators/CalcHelpers';
import {SkillBenefit} from '../types/types';
import {buffRegex} from '../helpers/regexes';

export function convertDetailsToSkillBenefits(skillInfo: string): SkillBenefit[] {
  const skillBenefits: SkillBenefit[] = [];

  // Prevent Aura of Censure and Inquisitor Seal
  // from calculating fire damage.

  for (let infoRow of skillInfo.split('\n')) {
    if (infoRow.includes('Energy Reserved')) {
      infoRow = infoRow.split('Energy Reserved')[1];
    }

    if (!infoRow) continue;

    if (infoRow.match(buffRegex('dmg')) || infoRow.match(buffRegex('resistance'))) {
      // The 'damage' from these skills damages enemies, not a buff to players:
      const skillName = skillInfo.split('\n')[0];
      if (skillName === 'Inquisitor Seal' || skillName === 'Aura of Censure') continue;

      skillBenefits.push(makeDmgOrResSkillBenefit(infoRow));
      continue;
    }
    if (infoRow.match(buffRegex('healing'))) {
      skillBenefits.push(...calcHealingBenefits(infoRow));
      continue;
    }
    if (infoRow.match(buffRegex('health'))) {
      skillBenefits.push(makeSkillBenefit(infoRow, 'Health'));
      continue;
    }
    if (infoRow.match(buffRegex('oaAndDa'))) {
      const offOrDef = infoRow.includes('Offensive') ? 'OA' : 'DA';
      skillBenefits.push(makeSkillBenefit(infoRow, offOrDef));
      continue;
    }
    if (infoRow.includes('Damage Absorption')) {
      skillBenefits.push(makeSkillBenefit(infoRow, 'Damage Absorption'));
      continue;
    }
    if (infoRow.includes('Damage converted to Health')) {
      skillBenefits.push(makeSkillBenefit(infoRow, 'Lifesteal'));
      continue;
    }
    if (infoRow.includes('Healing Effects Increased by ')) {
      skillBenefits.push(getHealingEffectsIncreasedSkillBenefit(infoRow));
    }
    if (infoRow.match(buffRegex('speed'))) {
      skillBenefits.push(makeSkillBenefit(infoRow, getSpeedType(infoRow)));
      continue;
    }
    if (infoRow.match(buffRegex('armor'))) {
      skillBenefits.push(makeArmorBenefit(infoRow));
      continue;
    }
    if (infoRow.match(buffRegex('retaliation'))) {
      skillBenefits.push(makeDmgOrResSkillBenefit(infoRow));
      continue;
    }
  }

  // console.log('----------- Skil Benefit: ');
  // console.log(skillBenz);

  return skillBenefits;
}
