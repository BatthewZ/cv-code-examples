import {CategorisedBenefits, ReducedBenefit} from '../types/types';

export function categoriseBenefits(cbs: ReducedBenefit[]) {
  const categorised: CategorisedBenefits = {
    healAndHealth: [],
    damage: [],
    defensive: [],
    speed: [],
    debuffs: [],
    oaDaCrit: [],
    resReduction: [],
  };

  for (const cb of cbs) {
    switch (cb.type) {
      case 'Health Regen':
      case 'Healing Increase':
      case 'Health Restored':
      case 'Health':
      case 'Lifesteal':
        categorised.healAndHealth.push(cb);
        break;
      case 'Damage':
        cb.damageType === 'Crit' ? categorised.oaDaCrit.push(cb) : categorised.damage.push(cb);
        break;
      case 'OA':
      case 'DA':
        categorised.oaDaCrit.push(cb);
        break;
      case 'Attack Speed':
      case 'Casting Speed':
      case 'Total Speed':
      case 'Movement Speed':
        categorised.speed.push(cb);
        break;
      case 'Resistance':
      case 'Damage Absorption':
      case 'Armor':
        categorised.defensive.push(cb);
        break;
      // Add cases for debuffs and RR here.
      case 'Fumble':
      case 'Impaired Aim':
        categorised.debuffs.push(cb);
        break;
      default:
        console.log('Could not categorise: ');
        console.log(cb);
        break;
    }
  }

  return categorised;
}
