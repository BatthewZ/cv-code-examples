import {Character, Item, Skill} from './old_oldTypes';

export function ConvertJsonToChar(data: JSON) {
  if (
    !data.hasOwnProperty('class1') ||
    !data.hasOwnProperty('class2') ||
    !data.hasOwnProperty('class1Skills') ||
    !data.hasOwnProperty('class2Skills') ||
    !data.hasOwnProperty('devotions') ||
    !data.hasOwnProperty('items')
  ) {
    console.log('The JSON passed was incompatible for conversion.');
    return;
  }

  console.log('JSON is compatible');

  // Convert json into Character
  const char: Character = Object.assign(data);

  if (char?.items !== undefined) char.items = formatItems(char?.items);

  console.log("Here's the char items:");
  console.log(char?.items);

  return char;
}

function formatItems(items: Item[]) {
  const itemsAsArray = Object.entries(items);
  const newItems: Item[] = itemsAsArray.map((item) => {
    const newItem: Item = {
      name: item[1].name,
      type: item[1].type,
      itemPosition: item[0],
      component: item[1].component,
      augment: item[1].augment,
      info: item[1].info,
      grantedSkill: item[1].grantedSkill,
    };

    return newItem;
  });

  return newItems;
}

function grantedItemStringToSkill(grantedSkill?: Skill | String): Skill | undefined {
  if (grantedSkill === undefined) {
    return undefined;
  }

  if (grantedSkill instanceof String) {
    console.log('granted skill is a string');
  }

  if (grantedSkill as String) {
    let name = grantedSkill.toString().split('\n')[0].replaceAll('(Granted by Item)', '').trim();
    if (name.includes('(')) {
      name = name.split('(')[0].trim();
    }
    const infoRows = grantedSkill.toString().split('\n');
    let info = '';
    for (let i = 2; i < infoRows.length; i++) {
      info += infoRows[i];
      if (i < infoRows.length - 1) info += '\n';
    }
    const skill: Skill = {
      name: name,
      info: info,
      level: '',
      benefits: [],
      debuffs: [],
    };
    return skill;
  }
}
