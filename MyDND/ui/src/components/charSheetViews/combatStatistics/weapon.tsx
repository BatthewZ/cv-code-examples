import {useEffect, useState} from 'react';
import {AttributeType, WeaponType} from '../../../types/types';
import {Dice} from '../../inputs/dice';
import {DiceType} from '../../../types/types';
import {EditableText} from '../../inputs/EditableText';
import {mapAttributeOptions} from '../../../helper/attributes';
import {calcModifier} from '../../../helper/calculateModifier';
import {rollDamage} from '../../../helper/rollDamage';
import {DiceRollView} from '../../miscUI/diceRollView';

type WeaponProps = {
  weapon: WeaponType;
  changeAttribute: Function;
  refreshWeaponsView: Function;
  deleteWeapon: Function;
  attributeModifer: number;
  setDiceModal: Function;
};

export const Weapon: React.FC<WeaponProps> = ({
  weapon,
  changeAttribute,
  deleteWeapon,
  attributeModifer,
  refreshWeaponsView,
  setDiceModal,
}: WeaponProps) => {
  const [weapName, setWeapName] = useState(weapon.name);
  const [baseDmg, setBaseDmg] = useState(weapon.dmg.numOfDice + 'd' + weapon.dmg.typeOfDice);
  const [bonusDmg, setBonusDmg] = useState('' + weapon.dmg.dmgMod);
  const [dmgType, setDmgType] = useState(weapon.dmg.type);
  const [attributeType, setAttributeType] = useState(weapon.attribute + '');
  const [delButtonView, setDelButtonView] = useState(delButton());

  useEffect(() => {
    weapon.name = weapName;
  }, [weapName]);
  useEffect(() => {
    weapon.dmg.numOfDice = +baseDmg.split('d')[0];
    weapon.dmg.typeOfDice = +baseDmg.split('d')[1] as DiceType;
  }, [baseDmg]);
  useEffect(() => {
    weapon.dmg.dmgMod = +bonusDmg;
  }, [bonusDmg]);
  useEffect(() => {
    weapon.dmg.type = dmgType;
  }, [dmgType]);
  useEffect(() => {
    weapon.attribute = attributeType as AttributeType;
    changeAttribute(attributeType);
  }, [attributeType]);

  useEffect(() => {
    refreshWeaponsView();
  }, [weapName, baseDmg, bonusDmg, dmgType, attributeType]);

  function confirmButtons() {
    return (
      <div className=''>
        <button onClick={() => deleteWeapon(weapon.id)}>Confirm Delete</button>
        <button onClick={() => setDelButtonView(delButton())}>Cancel</button>
      </div>
    );
  }

  function delButton() {
    return <button onClick={() => setDelButtonView(confirmButtons())}>Delete</button>;
  }

  return (
    <fieldset className='weapon'>
      <legend>
        <strong>{weapon.name ?? 'Weapon'}</strong>
      </legend>
      <div className='weaponProp'>
        <EditableText
          fieldName={'weaponName'}
          title='Weapon Name'
          value={weapName}
          confirmEdit={(e: string) => {
            setWeapName(e);
          }}
        />
      </div>
      <div className='weaponProp'>
        <Dice
          num={+baseDmg.split('d')[0]}
          type={+baseDmg.split('d')[1] as DiceType}
          title='Base Dmg'
          updateState={(e: string) => setBaseDmg(e)}
        />
      </div>
      <div className='weaponProp'>
        <EditableText
          inputType='number'
          title='Damage Modifier'
          fieldName={'bonusDmg'}
          value={bonusDmg}
          confirmEdit={(e: string) => {
            setBonusDmg(e);
          }}
        />
      </div>
      <div className='weaponProp'>
        <p>
          <strong>Attribute Modifier: </strong>
        </p>
        {attributeType ? calcModifier('' + attributeModifer) : '0'}
      </div>
      <div className='weaponProp'>
        <EditableText
          fieldName={'dmgType'}
          title={'Damage Type'}
          value={dmgType}
          confirmEdit={(e: string) => {
            setDmgType(e);
          }}
        />
      </div>
      <div className='weaponProp'>
        <div>
          <p>
            <strong>Attribute:</strong>
          </p>
          <select onChange={(e) => setAttributeType(e.currentTarget.value)} defaultValue={attributeType}>
            <option value=''>Select Attribute...</option>
            {mapAttributeOptions()}
          </select>
        </div>
      </div>
      <div className='weaponProp'>
        <button
          onClick={() => {
            setDiceModal(
              true,
              <DiceRollView
                diceRoll={rollDamage(
                  weapon.dmg.numOfDice,
                  weapon.dmg.typeOfDice,
                  weapon.dmg.dmgMod,
                  calcModifier('' + attributeModifer)
                )}
              />
            );
          }}
        >
          Roll Damage
        </button>
      </div>
      <div className='weaponProp'>{delButtonView}</div>
    </fieldset>
  );
};
