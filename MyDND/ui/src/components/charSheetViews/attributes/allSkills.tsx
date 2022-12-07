import {calcModifier} from '../../../helper/calculateModifier';
import {AttributeType} from '../../../types/types';

import {Skill} from './skill';

const allSkills: {[index: string]: AttributeType} = {
  Acrobatics: 'Dexterity',
  'Animal Handling': 'Wisdom',
  Arcana: 'Intelligence',
  Athletics: 'Strength',
  Deception: 'Charisma',
  History: 'Intelligence',
  Insight: 'Wisdom',
  Intimidation: 'Charisma',
  Investigation: 'Intelligence',
  Medicine: 'Wisdom',
  Nature: 'Intelligence',
  Perception: 'Wisdom',
  Performance: 'Charisma',
  Persuasion: 'Charisma',
  Religion: 'Intelligence',
  'Sleight of Hand': 'Dexterity',
  Stealth: 'Dexterity',
  Survival: 'Wisdom',
};

type AllSkillsProps = {
  dex: number;
  str: number;
  con: number;
  wis: number;
  int: number;
  cha: number;
  profBonus: number;
  skillProfs: Record<string, boolean>;
  updateProficiencies: Function;
};

export const AllSkills: React.FC<AllSkillsProps> = ({
  dex,
  str,
  con,
  wis,
  int,
  cha,
  profBonus,
  skillProfs,
  updateProficiencies,
}: AllSkillsProps) => {
  function mapSkills() {
    return Object.keys(allSkills).map((skillName) => {
      let value = 0;
      const defaultChecked = skillProfs[skillName];
      switch (allSkills[skillName]) {
        case 'Dexterity':
          value = dex;
          break;
        case 'Strength':
          value = str;
          break;
        case 'Constitution':
          value = con;
          break;
        case 'Intelligence':
          value = int;
          break;
        case 'Wisdom':
          value = wis;
          break;
        case 'Charisma':
          value = cha;
          break;
      }
      return (
        <Skill
          key={skillName + '-id'}
          title={skillName}
          attribute={allSkills[skillName]}
          value={calcModifier('' + value)}
          profBonus={profBonus}
          defaultChecked={defaultChecked}
          updateProficiencies={updateProficiencies}
        />
      );
    });
  }

  return <div>{mapSkills()}</div>;
};

// const allSkills = [
//   'Acrobatics',
//   'Animal Handling',
//   'Arcana',
//   'Athletics',
//   'Deception',
//   'History',
//   'Insight',
//   'Intimidation',
//   'Investigation',
//   'Medicine',
//   'Nature',
//   'Perception',
//   'Performance',
//   'Persuasion',
//   'Religion',
//   'Sleight of Hand',
//   'Stealth',
//   'Survival',
// ];
