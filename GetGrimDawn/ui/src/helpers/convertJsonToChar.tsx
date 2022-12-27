import {Character} from '../types/types';

export function convertJsonToChar(data: any) {
  if (
    !data.hasOwnProperty('classes') ||
    !data.hasOwnProperty('items') ||
    !data.hasOwnProperty('devotions') ||
    !data.hasOwnProperty('skills') ||
    !data.hasOwnProperty('attributes') ||
    !data.hasOwnProperty('url')
  ) {
    console.log('The JSON passed was incompatible for conversion.');
    return;
  }

  const char: Character = {
    classes: [],
    items: data.items,
    devotions: data.devotions,
    skills: data.skills,
    attributes: data.attributes,
    url: data.url,
    teamSkills: {
      teamSkills: [],
      healingSkills: [],
      allSkills: [],
      debuffs: [],
    },
  };

  for (const charClass of data.classes) {
    // console.log(charClass);
    char.classes.push(charClass.name);
  }

  // console.log(char);
  return char;
}
