import {useEffect, useRef, useState} from 'react';
import {v4 as uuid} from 'uuid';
import {RadioButtons} from '../components/inputs/RadioButtons';
import {AttributesView} from '../components/charSheetViews/attributes/attributesView';
import {CharacterInfo} from '../components/charSheetViews/characterInfo/characterInfo';
import {EditableText} from '../components/inputs/EditableText';
import {Dice} from '../components/inputs/dice';
import {AttackOrSpellType, Character, WeaponType} from '../types/types';
import {DiceView} from '../components/charSheetViews/dice/diceView';
import {AttributeType, DiceType} from '../types/types';
import {MappedWeapons} from '../components/charSheetViews/combatStatistics/mappedWeapons';
import {MappedAttacksOrSpells} from '../components/charSheetViews/combatStatistics/mappedAttacks';
import {EditableArray} from '../components/inputs/EditableArray';
import {deleteCharacter, updateCharacter} from '../apiCalls/apiCalls';
import {DeleteButton} from '../components/miscUI/deleteButton';
import {LoadingModal} from '../components/miscUI/loadingModal';

type ViewState = 'Attributes' | 'Character Info' | 'Combat Statistics' | 'Inventory' | 'Dice' | 'Notes' | undefined;

type CharSheetProps = {
  character: Character;
  toCharacterSelect: Function;
  logout: Function;
};

export const CharacterSheet: React.FC<CharSheetProps> = ({character, toCharacterSelect, logout}: CharSheetProps) => {
  const [charId, setCharId] = useState(character.charId);

  // UI Related:
  const [view, setView] = useState<ViewState>();
  const [diceRollModal, setDiceRollModal] = useState(<></>);

  // Attributes:
  const [strength, setStrength] = useState(character.attributes.strength);
  const [dexterity, setDexterity] = useState(character.attributes.dexterity);
  const [constitution, setConstitution] = useState(character.attributes.constitution);
  const [intelligence, setIntelligence] = useState(character.attributes.intelligence);
  const [wisdom, setWisdom] = useState(character.attributes.wisdom);
  const [charisma, setCharisma] = useState(character.attributes.charisma);
  const [proficiencyBonus, setProficiencyBonus] = useState(character.proficiencyBonus);

  // Character info:
  const [charName, setCharName] = useState(character.charInfo.charName);
  const [characterClass, setCharacterClass] = useState(character.charInfo.characterClass);
  const [level, setLevel] = useState(character.charInfo.level);
  const [race, setRace] = useState(character.charInfo.race);
  const [alignment, setAlignment] = useState(character.charInfo.alignment);
  const [experience, setExperience] = useState(character.charInfo.experience);
  const [background, setBackground] = useState(character.charInfo.background);

  // Combat stats:
  const [hpMax, setHpmax] = useState(character.hp.hpMax);
  const [hpCurr, setHpcurr] = useState(character.hp.hpCurr);
  const [hitDie, setHitDie] = useState(character.hp.hitDie);
  const [tempHp, setTemphp] = useState(character.hp.tempHp);
  const [ac, setAc] = useState(character.combatStats.ac);
  const [initiative, setInitiative] = useState(character.combatStats.initiative);
  const [speed, setSpeed] = useState(character.combatStats.speed);
  const [weapons, setWeapons] = useState<WeaponType[]>(character.weapons);

  const [savingThrowProfs, setSavingThrowProfs] = useState<Record<string, boolean>>(character.savingThrowProfs);
  const [skillProfs, setSkillProfs] = useState<Record<string, boolean>>(character.skillProfs);

  // Misc other:
  const [notes, setNotes] = useState(character.notes);
  const [otherProficiencies, setOtherProficiencies] = useState<string[]>(character.otherProficiencies);
  const [languages, setLanguages] = useState<string[]>(character.languages);
  const [inventory, setInventory] = useState<string[]>(character.inventory);
  const [attacksAndSpells, setAttacksAndSpells] = useState<AttackOrSpellType[]>(character.attacksAndSpells);

  // Update DB for every edit:
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      updateCharacter(getThisCharacter());
    }
  }, [
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    proficiencyBonus,
    charName,
    characterClass,
    level,
    race,
    alignment,
    experience,
    background,
    hpMax,
    hpCurr,
    hitDie,
    tempHp,
    ac,
    initiative,
    speed,
    weapons,
    savingThrowProfs,
    skillProfs,
    notes,
    otherProficiencies,
    languages,
    inventory,
    attacksAndSpells,
  ]);

  function getThisCharacter(): Character {
    return {
      charId: charId,
      notes: notes,
      skillProfs: skillProfs,
      proficiencyBonus: proficiencyBonus,
      savingThrowProfs: savingThrowProfs,
      attributes: {
        strength: strength,
        dexterity: dexterity,
        constitution: constitution,
        intelligence: intelligence,
        wisdom: wisdom,
        charisma: charisma,
      },
      charInfo: {
        charName: charName,
        characterClass: characterClass,
        level: level,
        race: race,
        alignment: alignment,
        experience: experience,
        background: background,
      },
      hp: {
        hpMax: hpMax,
        hpCurr: hpCurr,
        hitDie: hitDie,
        tempHp: tempHp,
      },
      combatStats: {
        ac: ac,
        initiative: initiative,
        speed: speed,
      },
      weapons: weapons,
      attacksAndSpells: attacksAndSpells,
      inventory: inventory,
      languages: languages,
      otherProficiencies: otherProficiencies,
    };
  }

  function updateSkillProfs(skill: string, profType: 'skill' | 'savingThrow') {
    const profState = profType === 'skill' ? skillProfs : savingThrowProfs;
    const updateState = profType === 'skill' ? setSkillProfs : setSavingThrowProfs;
    const proficiencies = {...profState};

    if (proficiencies[skill] === true) {
      proficiencies[skill] = false;
    } else proficiencies[skill] = true;

    updateState(() => proficiencies);
  }

  function getAttributeState(attribute?: AttributeType) {
    if (!attribute) return '';
    switch (attribute) {
      case 'Charisma':
        return charisma;
      case 'Constitution':
        return constitution;
      case 'Dexterity':
        return dexterity;
      case 'Intelligence':
        return intelligence;
      case 'Strength':
        return strength;
      case 'Wisdom':
        return wisdom;
    }
  }

  // Weapon functions
  function refreshWeaponsArray() {
    if (weapons) {
      const newWeapons = [...weapons];
      setWeapons((prev) => newWeapons);
    }
  }

  function addWeapon() {
    setWeapons((prev) => [
      ...prev,
      {
        id: uuid(),
        name: '',
        dmg: {numOfDice: 0, typeOfDice: 2, dmgMod: 0, type: ''},
        attackModifier: 0,
        attribute: 'Strength',
      },
    ]);
  }

  function deleteWeapon(weaponId: string) {
    setWeapons((prev) => [...prev].filter((weapon) => weapon.id !== weaponId));
  }

  // Attacks/Spells functions
  function refreshAttackOrSpellsArray() {
    if (attacksAndSpells) {
      const newAttacks = [...attacksAndSpells];
      setAttacksAndSpells((prev) => newAttacks);
    }
  }

  function addAttackOrSpell() {
    setAttacksAndSpells((prev) => [
      ...prev,
      {
        id: uuid(),
        name: '',
        dmg: {numOfDice: 0, typeOfDice: 2, dmgMod: 0, type: ''},
        description: '',
      },
    ]);
  }

  function deleteAttackOrSpell(attackId: string) {
    setAttacksAndSpells((prev) => [...prev].filter((attack) => attack.id !== attackId));
  }

  // Inventory / Languages / Other Proficiencies functions
  function addToStringArray(stringArrName: 'inventory' | 'languages' | 'otherProficiencies') {
    switch (stringArrName) {
      case 'inventory':
        setInventory((prev) => [...prev, 'Click to set item...']);
        break;
      case 'languages':
        setLanguages((prev) => [...prev, 'Click to set language...']);
        break;
      case 'otherProficiencies':
        setOtherProficiencies((prev) => [...prev, 'Click to set proficiency...']);
        break;
    }
  }

  function deleteItemFromArray(item: string, stringArrName: 'inventory' | 'languages' | 'otherProficiencies') {
    switch (stringArrName) {
      case 'inventory':
        setInventory((prev) => [...prev].filter((i) => i !== item));
        break;
      case 'languages':
        setLanguages((prev) => [...prev].filter((i) => i !== item));
        break;
      case 'otherProficiencies':
        setOtherProficiencies((prev) => [...prev].filter((i) => i !== item));
        break;
    }
  }

  function updateArray(
    oldItem: string,
    newItem: string,
    stringArrName: 'inventory' | 'languages' | 'otherProficiencies'
  ) {
    let newArr = [];
    let updateFunc: React.Dispatch<React.SetStateAction<string[]>>;
    switch (stringArrName) {
      case 'inventory':
        newArr = [...inventory];
        updateFunc = setInventory;
        break;
      case 'languages':
        newArr = [...languages];
        updateFunc = setLanguages;
        break;
      case 'otherProficiencies':
        newArr = [...otherProficiencies];
        updateFunc = setOtherProficiencies;
        break;
    }

    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i] === oldItem) newArr[i] = newItem;
    }

    updateFunc(newArr);
  }

  const viewStateRadios = [
    {onClick: () => setView('Attributes'), value: 'Attributes'},
    {onClick: () => setView('Combat Statistics'), value: 'Combat Statistics'},
    {onClick: () => setView('Character Info'), value: 'Character Info'},
    {onClick: () => setView('Inventory'), value: 'Inventory'},
    {onClick: () => setView('Dice'), value: 'Dice'},
    {onClick: () => setView('Notes'), value: 'Notes'},
  ];

  function updateModal(openModal = false, modalContent?: JSX.Element) {
    if (openModal) {
      setDiceRollModal(
        <LoadingModal content={modalContent ?? ''} isActive={true} closeButton={() => setDiceRollModal(<></>)} />
      );
    } else setDiceRollModal(<></>);
  }

  return (
    <div className='App fadeInOnLoad'>
      {diceRollModal}
      <div className='row centerChildren baseline spaceEvenly'>
        <div className='row centerChildren baseline'>
          <h2>{charName ? charName : 'Nameless'}</h2>
          <h3>
            {level ? ' | Level' : '| Level 0'} {level ?? 0} {race} {characterClass}
          </h3>
        </div>
        <div className='column'>
          <button onClick={() => toCharacterSelect()}>To Character Select</button>
          <DeleteButton
            onDelete={() => {
              deleteCharacter(charId).then(() => toCharacterSelect());
            }}
            buttonLabel='Delete Character'
          />
          <button onClick={() => logout()}>Logout</button>
        </div>
      </div>

      <div className='navBar rowWrap centerChildren'>
        <RadioButtons radioButtons={viewStateRadios} name={'viewSelect'} />
      </div>
      {!view ? (
        <p>
          Select <strong>Character Info</strong> to get started.
        </p>
      ) : (
        ''
      )}
      {view === 'Attributes' ? (
        <>
          <AttributesView
            setStrength={setStrength}
            setDexterity={setDexterity}
            setConstitution={setConstitution}
            setIntelligence={setIntelligence}
            setWisdom={setWisdom}
            setCharisma={setCharisma}
            setProficiencyBonus={setProficiencyBonus}
            updateSkillProfs={updateSkillProfs}
            proficiencyBonus={+proficiencyBonus}
            savingThrowProfs={savingThrowProfs}
            skillProfs={skillProfs}
            strength={strength}
            dexterity={dexterity}
            constitution={constitution}
            intelligence={intelligence}
            wisdom={wisdom}
            charisma={charisma}
          />
        </>
      ) : (
        ''
      )}
      {view === 'Character Info' ? (
        <div className='fadeInOnLoad'>
          <CharacterInfo
            charName={charName + ''}
            setCharName={setCharName}
            characterClass={characterClass + ''}
            setCharacterClass={setCharacterClass}
            race={race + ''}
            setRace={setRace}
            level={level + ''}
            setLevel={setLevel}
            alignment={alignment + ''}
            setAlignment={setAlignment}
            experience={experience + ''}
            setExperience={setExperience}
            background={background + ''}
            setBackground={setBackground}
          />

          <p>
            <strong>Languages</strong>
          </p>
          <EditableArray
            items={languages}
            addItem={() => addToStringArray('languages')}
            deleteItem={(e: string) => deleteItemFromArray(e, 'languages')}
            updateItem={(oldName: string, newName: string) => updateArray(oldName, newName, 'languages')}
          />
          <div>
            <hr />
          </div>
          <p>
            <strong>Other Proficiencies</strong>
          </p>
          <EditableArray
            items={otherProficiencies}
            addItem={() => addToStringArray('otherProficiencies')}
            deleteItem={(e: string) => deleteItemFromArray(e, 'otherProficiencies')}
            updateItem={(oldName: string, newName: string) => updateArray(oldName, newName, 'otherProficiencies')}
          />
        </div>
      ) : (
        ''
      )}
      {view === 'Combat Statistics' ? (
        <>
          <div className='combatStats column centerChildren fadeInOnLoad'>
            <fieldset className='row spaceEvenly'>
              <EditableText fieldName={'ac'} value={ac + ''} confirmEdit={setAc} title={'Armour Class'} />
              <EditableText
                fieldName={'initiative'}
                value={initiative + ''}
                confirmEdit={setInitiative}
                title={'Initiative'}
              />
              <EditableText fieldName={'speed'} value={speed + ''} confirmEdit={setSpeed} title={'Speed'} />
            </fieldset>
            <fieldset className='row spaceEvenly'>
              <EditableText fieldName={'hpMax'} value={hpMax + ''} confirmEdit={setHpmax} title={'Max HP'} />
              <EditableText fieldName={'hpCurr'} value={hpCurr + ''} confirmEdit={setHpcurr} title={'Current HP'} />
              <EditableText fieldName={'tempHp'} value={tempHp + ''} confirmEdit={setTemphp} title={'Temporary HP'} />
              {/* <EditableText fieldName={'hitDie'} value={hitDie + ''} confirmEdit={setHitdie} title={'Hit Die'} /> */}
              <Dice
                title='Hit Die'
                num={hitDie ? +hitDie.split('d')[0] : 0}
                type={hitDie ? (+hitDie.split('d')[1] as DiceType) : 2}
                updateState={setHitDie}
              />
            </fieldset>
            <fieldset className='column centerChildren spaceEvenly'>
              <p>
                <strong>Weapons:</strong>
              </p>
              <MappedWeapons
                weapons={weapons}
                refreshWeaponsArray={refreshWeaponsArray}
                getAttributeState={getAttributeState}
                deleteWeapon={deleteWeapon}
                setDiceModal={updateModal}
              />
              <p>
                <button onClick={() => addWeapon()}>Add Weapon</button>
              </p>
            </fieldset>
            <fieldset>
              <p>
                <strong>Attacks or Spells:</strong>
              </p>
              <MappedAttacksOrSpells
                attacksOrSpells={attacksAndSpells}
                refreshView={refreshAttackOrSpellsArray}
                deleteAttack={deleteAttackOrSpell}
              />
              <p>
                <button onClick={addAttackOrSpell}>Add Attack/Spell</button>
              </p>
            </fieldset>
          </div>
        </>
      ) : (
        ''
      )}
      {view === 'Inventory' ? (
        <div className='fadeInOnLoad'>
          <EditableArray
            items={inventory}
            addItem={() => addToStringArray('inventory')}
            deleteItem={(e: string) => deleteItemFromArray(e, 'inventory')}
            updateItem={(oldName: string, newName: string) => updateArray(oldName, newName, 'inventory')}
          />
        </div>
      ) : (
        ''
      )}
      {view === 'Dice' ? <DiceView setDiceModal={updateModal} /> : ''}
      {view === 'Notes' ? (
        <div className='column fadeInOnLoad'>
          <EditableText fieldName={''} value={notes} confirmEdit={setNotes} className='notes' inputType='textarea' />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
