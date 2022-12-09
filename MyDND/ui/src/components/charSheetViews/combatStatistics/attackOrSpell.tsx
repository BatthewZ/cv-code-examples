import React, {useEffect, useState} from 'react';
import {rollDamage} from '../../../helper/rollDamage';
import {AttackOrSpellType, DiceType} from '../../../types/types';
import {Dice} from '../../inputs/dice';
import {EditableText} from '../../inputs/EditableText';
import {DiceRollView} from '../../miscUI/diceRollView';

type AttackOrSpellProps = {
  refreshAttacksView: Function;
  deleteItem: Function;
  attackOrSpell: AttackOrSpellType;
  setDiceModal: Function;
};

export const AttackOrSpell: React.FC<AttackOrSpellProps> = ({
  attackOrSpell,
  refreshAttacksView,
  deleteItem,
  setDiceModal,
}: AttackOrSpellProps) => {
  const [name, setName] = useState(attackOrSpell.name);
  const [description, setDescription] = useState(attackOrSpell.description);
  const [baseDmg, setBaseDmg] = useState(attackOrSpell.dmg.numOfDice + 'd' + attackOrSpell.dmg.typeOfDice);
  const [damageModifier, setDamageModifier] = useState('' + attackOrSpell.dmg.dmgMod);
  const [dmgType, setDmgType] = useState(attackOrSpell.dmg.type);
  const [delButtonView, setDelButtonView] = useState(delButton());

  useEffect(() => {
    attackOrSpell.name = name;
  }, [name]);
  useEffect(() => {
    attackOrSpell.dmg.numOfDice = +baseDmg.split('d')[0];
    attackOrSpell.dmg.typeOfDice = +baseDmg.split('d')[1] as DiceType;
  }, [baseDmg]);
  useEffect(() => {
    attackOrSpell.dmg.dmgMod = +damageModifier;
  }, [damageModifier]);

  useEffect(() => {
    refreshAttacksView();
  }, [name, baseDmg, damageModifier, description]);

  function confirmButtons() {
    return (
      <div className=''>
        <button onClick={() => deleteItem(attackOrSpell.id)}>Confirm Delete</button>
        <button onClick={() => setDelButtonView(delButton())}>Cancel</button>
      </div>
    );
  }

  function delButton() {
    return <button onClick={() => setDelButtonView(confirmButtons())}>Delete</button>;
  }

  return (
    <fieldset className='row centerChildren'>
      {name ? <legend>{name}</legend> : ''}
      <div className='column width75Percent'>
        <EditableText
          title='Attack/Spell Name'
          fieldName={'attackOrSpellName'}
          value={name}
          confirmEdit={(e: string) => setName(e)}
        />
        <EditableText
          fieldName={'attackOrSpellDescription'}
          title='Description'
          inputType='textarea'
          value={description}
          confirmEdit={(e: string) => setDescription(e)}
          className='notes'
        />
      </div>
      <div className='column'>
        <Dice
          num={+baseDmg.split('d')[0]}
          type={+baseDmg.split('d')[1] as DiceType}
          title='Damage'
          updateState={(e: string) => setBaseDmg(e)}
        />
        <EditableText
          inputType='number'
          title='Damage Modifier'
          fieldName={'bonusDmg'}
          value={damageModifier}
          confirmEdit={(e: string) => {
            setDamageModifier(e);
          }}
        />
        <EditableText
          fieldName={'dmgType'}
          title={'Damage Type'}
          value={dmgType}
          confirmEdit={(e: string) => {
            setDmgType(e);
          }}
        />
        <button
          onClick={() => {
            setDiceModal(
              true,
              <DiceRollView
                dmgRoll={rollDamage(attackOrSpell.dmg.numOfDice, attackOrSpell.dmg.typeOfDice, +damageModifier)}
              />
            );
          }}
        >
          Roll Damage
        </button>
        <p></p>
        {delButtonView}
      </div>
    </fieldset>
  );
};
