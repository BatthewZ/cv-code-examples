import {DamageTypes, SkillBenefit} from '../types/types';
import {flatOrPercentage} from './CalcHelpers';

export type DamageOrResistance = 'Damage' | 'Resistance';

function extractDmgOrResValueFrom(infoRow: string): number {
  // Handle these formats, find average of the numbers:
  // 25 Physical Damage
  // +79/+111% to All Damage
  // 23-45 Lightning Damage
  // 324-123/543-1284

  let numbers = infoRow.split(' ')[0].replaceAll('%', '').replaceAll('+', '').replaceAll('/', '-');
  let value = 0;
  if (numbers.includes('-')) {
    let total = 0;
    const allNumbers = numbers.split('-');
    // nullNums used for dealing with negative numbers (ie "-15% Elemental Resistance");
    let nullNums = 0;
    for (const num of allNumbers) {
      if (!num) nullNums++;
      total += +num;
    }
    // console.log('--- : ' + infoRow);
    // console.log('total is: ' + total + '; allnumbers.length is: ' + (allNumbers.length - nullNums));
    // console.log('All numbers is: ' + allNumbers);
    value = total / (allNumbers.length - nullNums);
    // console.log('Average is: ' + value);
  } else {
    value = +numbers;
  }
  return value;
}

function extractDmgOrResTypeFrom(infoRow: string, dmgOrRes: DamageOrResistance): DamageTypes {
  if (infoRow.includes('Vitality Decay')) return 'Vitality Decay';
  if (infoRow.includes('to All')) {
    if (infoRow.includes('Retaliation')) return 'All Retaliation';

    return 'All';
  }

  if (infoRow.includes('Physical Damage Retaliation')) return 'Physical Retaliation';

  //"+90% Internal Trauma Damage" > "Internal Trauma"
  return infoRow.split(dmgOrRes)[0].replaceAll(infoRow.split(' ')[0], '').trim() as DamageTypes;
}

export function makeDmgOrResSkillBenefit(infoRow: string): SkillBenefit {
  const benefitType =
    infoRow.includes('Damage') || infoRow.includes('Decay') || infoRow.includes('Retaliation')
      ? 'Damage'
      : 'Resistance';
  return {
    numType: flatOrPercentage(infoRow),
    value: extractDmgOrResValueFrom(infoRow),
    benefitType: benefitType,
    damageType: extractDmgOrResTypeFrom(infoRow, benefitType),
  };
}
