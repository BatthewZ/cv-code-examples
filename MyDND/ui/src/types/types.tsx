import {v4} from 'uuid';

export function getNewCharacter(): Character {
  return {
    charId: v4(),
    notes: '',
    skillProfs: {},
    proficiencyBonus: '',
    savingThrowProfs: {},
    attributes: {
      strength: '',
      dexterity: '',
      constitution: '',
      intelligence: '',
      wisdom: '',
      charisma: '',
    },
    charInfo: {
      charName: '',
      characterClass: '',
      level: '',
      race: '',
      alignment: '',
      experience: '',
      background: '',
    },
    hp: {
      hpMax: '',
      hpCurr: '',
      hitDie: '',
      tempHp: '',
    },
    combatStats: {
      ac: '',
      initiative: '',
      speed: '',
    },
    weapons: [],
    inventory: [],
    attacksAndSpells: [],
    languages: [],
    otherProficiencies: [],
  };
}

export type Character = {
  charId: string;
  notes: string;
  skillProfs: Record<string, boolean>;
  proficiencyBonus: string;
  savingThrowProfs: Record<string, boolean>;
  attributes: {
    strength: string;
    dexterity: string;
    constitution: string;
    intelligence: string;
    wisdom: string;
    charisma: string;
  };
  charInfo: {
    charName: string;
    characterClass: string;
    level: string;
    race: string;
    alignment: string;
    experience: string;
    background: string;
  };
  hp: {
    hpMax: string;
    hpCurr: string;
    hitDie: string;
    tempHp: string;
  };
  combatStats: {
    ac: string;
    initiative: string;
    speed: string;
  };
  weapons: WeaponType[];
  attacksAndSpells: AttackOrSpellType[];
  inventory: string[];
  languages: string[];
  otherProficiencies: string[];
};

export type AttributeType = 'Strength' | 'Dexterity' | 'Constitution' | 'Intelligence' | 'Wisdom' | 'Charisma';
export type DiceType = 2 | 4 | 6 | 8 | 10 | 12 | 20;
export type DamageType = {
  numOfDice: number;
  typeOfDice: DiceType;
  dmgMod: number;
  type: string;
};

export type WeaponType = {
  id: string;
  name: string;
  dmg: DamageType;
  attribute: AttributeType;
  attackModifier?: number;
};

export type AttackOrSpellType = {
  id: string;
  name: string;
  description: string;
  dmg: DamageType;
};
