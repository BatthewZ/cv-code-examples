import {CategorisedBenefits} from '../types/types';
import {formatBenefit} from './formatBenefit';

export function categorisedBenefitsToString(cbs: CategorisedBenefits) {
  let s = `OA, DA, and Crit Damage\n`;
  cbs.oaDaCrit.map((b) => {
    s += ' - ' + formatBenefit(b) + '\n';
  });
  s += 'Healing and Health\n';
  cbs.healAndHealth.map((b) => {
    s += ' - ' + formatBenefit(b) + '\n';
  });
  s += 'Damage Buffs\n';
  cbs.damage.map((b) => {
    s += ' - ' + formatBenefit(b) + '\n';
  });
  s += 'Defensive Buffs\n';
  cbs.defensive.map((b) => {
    s += ' - ' + formatBenefit(b) + '\n';
  });
  // debuffs...

  return s;
}
