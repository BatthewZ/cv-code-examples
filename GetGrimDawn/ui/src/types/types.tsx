export type ViewLabel = 'teamBuffs' | 'download' | 'teamSummary' | undefined;

export type Character = {
  classNames: string[];
  classes: Skill[];
  items: Item[];
  devotions: Skill[];
  skills: Skill[];
  attributes: Attributes;
  url: string;
  teamSkills: TeamSkills;
};

export type Attributes = {
  spirit: number;
  cunning: number;
  physique: number;
};

export type Item = {
  name: string;
  slot: string;
  component: string;
  augment: string;
  details: string;
  grantedSkills?: Skill[];
  prefix?: string;
  suffix?: string;
};

export type Skill = {
  name: string;
  level: number;
  buffedLevel: number;
  details: string;
  children?: Skill[];
  benefits: SkillBenefit[];
  debuffs: SkillBenefit[];
};

export type OverviewSkill = Skill & {charIndex: number};

export type TeamSkills = {
  teamSkills: Skill[];
  healingSkills: Skill[];
  allSkills: Skill[];
  debuffs: Skill[];
};

export type SkillBenefit = {
  numType: BenefitNumType;
  value: number;
  benefitType: BenefitType | SpeedType;
  damageType?: DamageTypes;
};

export type ReducedBenefit = {
  flatVal: number;
  percentageVal: number;
  reducedVal: number;
  reducedPercentageVal: number;
  type: BenefitType;
  damageType?: DamageTypes;
};

export type CategorisedBenefits = {
  healAndHealth: ReducedBenefit[];
  damage: ReducedBenefit[];
  defensive: ReducedBenefit[];
  speed: ReducedBenefit[];
  debuffs: ReducedBenefit[];
  oaDaCrit: ReducedBenefit[];
  resReduction: ReducedBenefit[];
};

export type BenefitNumType = 'Flat' | '%' | 'Reduced' | 'Reduced%';

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
  | 'Armor'
  | SpeedType;

export type SpeedType = 'Attack Speed' | 'Casting Speed' | 'Total Speed' | 'Movement Speed';

export type BaseDamageTypes =
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
  | 'All';

export type RetaliationDamageTypes = `${BaseDamageTypes} Retaliation`;

export type DamageTypes = BaseDamageTypes | RetaliationDamageTypes;
