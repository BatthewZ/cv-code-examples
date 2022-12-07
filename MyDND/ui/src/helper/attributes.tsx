import {AttributeType} from '../types/types';

export function getAttributesArray(): AttributeType[] {
  return ['Strength', 'Constitution', 'Dexterity', 'Intelligence', 'Wisdom', 'Charisma'];
}

export function mapAttributeOptions() {
  return getAttributesArray().map((attribute) => {
    return <option value={attribute}>{attribute}</option>;
  });
}
