import {DiceType} from '../types/types';

export type DiceRoll = {
  log: string;
  total: number;
};

export function rollDamage(numOfDice: number, typeOfDice: DiceType, dmgModifier = 0, attributeModifier = 0): DiceRoll {
  let dmg = dmgModifier + attributeModifier;

  let log = `Damage modifier: ${dmgModifier} \nAttribute Bonus: ${attributeModifier}`;

  for (let i = 0; i < numOfDice; i++) {
    const roll = Math.floor(Math.random() * (typeOfDice - 1 + 1)) + 1;
    log += `\nRoll ${i + 1}: ${roll}`;
    dmg += roll;
  }

  log += `\nTotal damage: ${dmg}`;

  return {
    log: log,
    total: dmg,
  };
}
