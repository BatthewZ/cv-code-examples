import {convertJsonToChar} from '../helpers/convertJsonToChar';
import {prepareTeamSkills} from '../helpers/prepareTeamSkills';
import * as charJson from './testChar.json';

export function getTestChar() {
  const data = JSON.parse(JSON.stringify(charJson));
  let character = convertJsonToChar(data);
  if (!character) {
    console.log('Failed to load character.');
    return;
  }
  character = prepareTeamSkills(character);
  return character;
}
