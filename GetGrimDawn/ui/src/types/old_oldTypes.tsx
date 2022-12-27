// All character types

export type Attributes = {
  spirit: number;
  cunning: number;
  physique: number;
};

export type Item = {
  name: string;
  type: string;
  itemPosition: string;
  component: string;
  augment: string;
  info: string;
  grantedSkill?: Skill | string;
};

export type Skill = {
  name: string;
  info: string;
  level: string;
  children?: Skill[];
  benefits: SkillBenefit[];
  debuffs: SkillBenefit[];
};

export type Character =
  | {
      class1: string;
      class1Skills?: Skill[];
      class2: string;
      class2Skills?: Skill[];
      devotions?: Skill[];
      items?: Item[];
      teamSkills?: TeamSkills;
      attributes?: Attributes;
    }
  | undefined;

export type TeamSkills = {
  teamSkills: Skill[];
  healingSkills: Skill[];
  allSkills: Skill[];
};

export type SkillBenefit = {
  numType: BenefitNumType;
  value: number;
  benefitType: BenefitType | SpeedType;
  damageType?: DamageTypes;
};

export type BenefitNumType = 'Flat' | '%' | 'Reduced';

// Working out how to get an array of types...
// const arrayOfBenefitTypes = [
//   'Damage',
//   'Resistance',
//   'Damage Absorption',
//   'OA',
//   'DA',
//   'Health Regen',
//   'Healing Increase',
//   'Armor',
//   'Health Restored',
//   'Health',
//   'Damage Reduction to Enemies',
//   'Lifesteal',
//   'Fumble',
//   'Impaired Aim',
//   'Shield Block Chance',
//   'Shield Damage Blocked',
//   'Shield Recovery Time',
// ];

export type BenefitType =
  | 'Damage'
  | 'Resistance'
  | 'Damage Absorption'
  | 'OA'
  | 'DA'
  | 'Health Regen'
  | 'Healing Increase'
  | 'Armor'
  | 'Health Restored'
  | 'Health'
  | 'Lifesteal'
  | 'Fumble'
  | 'Impaired Aim'
  | 'Shield Block Chance'
  | 'Shield Damage Blocked'
  | 'Shield Recovery Time'
  | SpeedType
  | debuffs;

export type debuffs =
  | 'Impaired Aim'
  | 'Fumble'
  | 'Damage Reduction to Enemies'
  | 'OA'
  | 'DA'
  | 'Resistance'
  | 'Damage'
  | 'Armor'; // or resist reduction, DA/OA reduction etc.

export type SpeedType = 'Attack Speed' | 'Casting Speed' | 'Total Speed' | 'Movement Speed';

export type DamageTypes =
  | 'Fire'
  | 'Cold'
  | 'Lightning'
  | 'Pierce'
  | 'Piercing'
  | 'Bleeding'
  | 'Vitality'
  | 'Aether'
  | 'Chaos'
  | 'Physical'
  | 'Internal Trauma'
  | 'Burn'
  | 'Frostburn'
  | 'Electrocute'
  | 'Poison'
  | 'Acid'
  | 'Vitality Decay'
  | 'Poison & Acid'
  | 'Life Reduction'
  | 'Reflected'
  | 'Crit'
  | 'All'
  | 'All Retaliation'; // After incorporating RetaliationDamageTypes, remove this...

export type RetaliationDamageTypes = `${DamageTypes} Retaliation`;

// Come up with DotDamage calculator (dmg / per second), save it as 'dmg flat'
