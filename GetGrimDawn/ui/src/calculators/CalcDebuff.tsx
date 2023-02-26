import {debuffRegex} from '../helpers/regexes';
import {DamageTypes, debuffs as Debuffs, Skill, SkillBenefit} from '../types/types';
import {makeDmgOrResSkillBenefit} from './CalcDmgOrRes';
import {getSpeedType, extractValue, makeSkillBenefit, makeArmorBenefit} from './CalcHelpers';

export function getDebuffs(skill: Skill): Skill {
  skill.debuffs = [];
  const debuffs: SkillBenefit[] = [];

  for (const infoRow of skill.details.split('\n')) {
    // "Reduced target's" OA | DA | Damage | Resistance
    if (infoRow.match(debuffRegex('reducedTarget'))) {
      if (infoRow.includes('Offensive')) {
        debuffs.push(makeReducedByBenefit(infoRow, 'OA'));
        continue;
      }
      if (infoRow.includes('Defensive')) {
        debuffs.push(makeReducedByBenefit(infoRow, 'DA'));
        continue;
      }
      if (infoRow.includes('Damage')) {
        debuffs.push(makeReducedByBenefit(infoRow, 'Damage'));
        continue;
      }
      if (infoRow.includes('Resistance')) {
        debuffs.push(makeReducedByBenefit(infoRow, 'Resistance'));
        continue;
      }
    }
    if (infoRow.match(debuffRegex('oaAndDa'))) {
      const offOrDef = infoRow.includes('Offensive') ? 'OA' : 'DA';
      debuffs.push(makeSkillBenefit(infoRow, offOrDef));
      continue;
    }

    if (infoRow.match(debuffRegex('percentageResReduction'))) {
      debuffs.push(makeValueNegative(makeDmgOrResSkillBenefit(infoRow)));
      continue;
    }

    if (infoRow.match(debuffRegex('speed'))) {
      debuffs.push(makeSkillBenefit(infoRow, getSpeedType(infoRow)));
      continue;
    }
    if (infoRow.includes('Slow')) {
      if (infoRow.includes('Slow Resistance')) continue;

      debuffs.push(makeReducedByBenefit(infoRow, 'Total Speed'));
    }
    if (infoRow.includes('Fumble')) {
      debuffs.push(makeReducedByBenefit(infoRow, 'Fumble'));
      continue;
    }
    if (infoRow.includes('Impaired Aim')) {
      debuffs.push(makeReducedByBenefit(infoRow, 'Impaired Aim'));
      continue;
    }
    if (infoRow.includes('Armor by -')) {
      console.log('Debuff found: ', skill);
      debuffs.push(makeArmorBenefit(infoRow));
      continue;
    }
  }

  if (debuffs.length) skill.debuffs = debuffs;

  return skill;
}

function makeValueNegative(sb: SkillBenefit): SkillBenefit {
  sb.value -= sb.value * 2;
  return sb;
}

function makeReducedByBenefit(infoRow: string, debuff: Debuffs): SkillBenefit {
  let dmgType;
  if (debuff === 'Damage' || debuff === 'Resistance') {
    dmgType = infoRow.split(' ' + debuff)[0];
    dmgType = dmgType.split("target's ")[1] as DamageTypes | undefined;
    if (!dmgType) dmgType = 'All' as DamageTypes;
  }
  const numType = infoRow.includes('%') ? 'Reduced%' : 'Reduced';

  return dmgType
    ? {
        numType: numType,
        value: extractValue(infoRow),
        benefitType: debuff,
        damageType: dmgType,
      }
    : {
        numType: numType,
        value: extractValue(infoRow),
        benefitType: debuff,
      };
}
