import {calcModifier} from '../../../helper/calculateModifier';
import {AllSkills} from './allSkills';
import {Attribute} from './attribute';
import {EditableText} from '../../inputs/EditableText';
import {Skill} from './skill';

type ViewProps = {
  setStrength: Function;
  setDexterity: Function;
  setConstitution: Function;
  setIntelligence: Function;
  setWisdom: Function;
  setCharisma: Function;
  setProficiencyBonus: Function;
  updateSkillProfs: Function;
  proficiencyBonus: number;
  savingThrowProfs: Record<string, boolean>;
  skillProfs: Record<string, boolean>;
  strength: string;
  dexterity: string;
  constitution: string;
  intelligence: string;
  wisdom: string;
  charisma: string;
};

export const AttributesView: React.FC<ViewProps> = (props) => {
  const {
    setStrength,
    setDexterity,
    setConstitution,
    setIntelligence,
    setWisdom,
    setCharisma,
    setProficiencyBonus,
    updateSkillProfs,
    proficiencyBonus,
    savingThrowProfs,
    skillProfs,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
  } = props;
  return (
    <div className='column centerChildren fadeInOnLoad'>
      <div className='attributes rowWrap spaceEvenly'>
        <Attribute updateState={setStrength} value={strength} name={'Strength'} />
        <Attribute updateState={setDexterity} value={dexterity} name={'Dexterity'} />
        <Attribute updateState={setConstitution} value={constitution} name={'Constitution'} />
        <Attribute updateState={setIntelligence} value={intelligence} name={'Intelligence'} />
        <Attribute updateState={setWisdom} value={wisdom} name={'Wisdom'} />
        <Attribute updateState={setCharisma} value={charisma} name={'Charisma'} />
      </div>
      <div>
        <hr />
      </div>

      <div className='rowWrap centerChildren'>
        {/* Skills */}
        <div className='row centerChildren'>
          <fieldset className='column centerChildren'>
            <legend>
              <strong>Skills</strong>
            </legend>
            <AllSkills
              dex={+dexterity}
              str={+strength}
              con={+constitution}
              wis={+wisdom}
              int={+intelligence}
              cha={+charisma}
              profBonus={+proficiencyBonus}
              skillProfs={skillProfs}
              updateProficiencies={(title: string) => updateSkillProfs(title, 'skill')}
            />
          </fieldset>
        </div>
        <div className='column'>
          {/* Proficiency */}

          <fieldset className='column'>
            <legend>
              <strong>Proficiency</strong>
            </legend>
            <EditableText
              inputType='number'
              fieldName={'proficiency'}
              value={proficiencyBonus + ''}
              confirmEdit={setProficiencyBonus}
              title={''}
            />
          </fieldset>

          {/* Saving Throws */}
          <div className='row centerChildren'>
            <div>
              <fieldset className='column'>
                <legend>
                  <strong>Saving Throws</strong>
                </legend>
                <Skill
                  title={'Strength'}
                  attribute={'Strength'}
                  value={calcModifier(strength)}
                  profBonus={proficiencyBonus}
                  updateProficiencies={(title: string) => updateSkillProfs(title, 'savingThrow')}
                  defaultChecked={savingThrowProfs['Strength']}
                />
                <Skill
                  title={'Dexterity'}
                  attribute={'Dexterity'}
                  value={calcModifier(dexterity)}
                  profBonus={proficiencyBonus}
                  updateProficiencies={(title: string) => updateSkillProfs(title, 'savingThrow')}
                  defaultChecked={savingThrowProfs['Dexterity']}
                />
                <Skill
                  title={'Constitution'}
                  attribute={'Constitution'}
                  value={calcModifier(constitution)}
                  profBonus={proficiencyBonus}
                  updateProficiencies={(title: string) => updateSkillProfs(title, 'savingThrow')}
                  defaultChecked={savingThrowProfs['Constitution']}
                />
                <Skill
                  title={'Intelligence'}
                  attribute={'Intelligence'}
                  value={calcModifier(intelligence)}
                  profBonus={proficiencyBonus}
                  updateProficiencies={(title: string) => updateSkillProfs(title, 'savingThrow')}
                  defaultChecked={savingThrowProfs['Intelligence']}
                />
                <Skill
                  title={'Wisdom'}
                  attribute={'Wisdom'}
                  value={calcModifier(wisdom)}
                  profBonus={proficiencyBonus}
                  updateProficiencies={(title: string) => updateSkillProfs(title, 'savingThrow')}
                  defaultChecked={savingThrowProfs['Wisdom']}
                />
                <Skill
                  title={'Charisma'}
                  attribute={'Charisma'}
                  value={calcModifier(strength)}
                  profBonus={proficiencyBonus}
                  updateProficiencies={(title: string) => updateSkillProfs(title, 'savingThrow')}
                  defaultChecked={savingThrowProfs['Charisma']}
                />
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
