function getClasses() {
  return [
    'Oathkeeper',
    'Occultist',
    'Necromancer',
    'Soldier',
    'Demolitionist',
    'Nightblade',
    'Arcanist',
    'Shaman',
    'Inquisitor',
  ];
}

function isClassName(string) {
  let isName = false;
  for (const className of getClasses()) {
    if (string.toLowerCase() === className.toLowerCase()) {
      isName = true;
      break;
    }
  }
  return isName;
}

function getSkillBuffedLevel(skill) {
  if (skill.details.includes('\n\nCurrent Level :')) {
    skill.buffedLevel = +skill.details.split('\n\nCurrent Level : ')[1].split('\n')[0].trim();
  }
  return skill;
}

function associateParentAndChildSkills(skillsArray) {
  const parents = [];
  const parentFound = {};

  for (let skill of skillsArray) {
    // console.log(`\nSkill is: ${skill.name} - ${skill.id}`);
    if (!skill.children) skill.children = [];
    // While we're iterating, refine some skill bits:
    if (skill.details.includes('Next Level')) skill.details = skill.details.split('\n\nNext Level')[0];
    skill = getSkillBuffedLevel(skill);

    // If it's a parent that hasn't already been added to the list:
    if (!skill.parentSkillIds && !parentFound[skill.id]) {
      parents.push(skill);
      parentFound[skill.id] = true;
      // console.log('Setting parentFound true with id: ', skill.id);
      // console.log('Skill is a parent or has been previously found.');
      continue;
    }

    // If the skill has a parent:
    if (skill.parentSkillIds && skill.parentSkillIds.length) {
      const parentId = skill.parentSkillIds[0];
      // console.log('Skill has a parent with id: ' + parentId);

      const parent = [...skillsArray].find((parentSkill) => parentSkill.id === parentId);

      // if (parent) {
      //   console.log('Parent located: ' + parent.id + ' | ' + parent.name);
      // } else {
      //   console.log('Parent was not found for some reason...');
      // }

      if (parentFound[parentId] === true) {
        // console.log('Parent had previously been found. Adding child.');
        parent.children.push(skill);
        continue;
      }

      // If parent hasn't been found yet:
      // console.log('Parent not yet recorded,adding this parent: ' + parent.name);
      parent.children = [skill];
      parents.push(parent);
      parentFound[parent.id] = true;
    }
  }

  // const writer = require('../saveCharJson');
  // writer.writeJsonToFile({skills: parents}, 'lookingForDuplicates');

  return parents;
}

function getDevotionSkills(devotionsArray) {
  return [...devotionsArray].filter((devotion) => devotion.isSkill === true);
}

function formatItems(itemsArray) {
  itemsArray = getItemNames(itemsArray);
  itemsArray = getThingFromItemDetails('[Granted Skills]', itemsArray);
  itemsArray = getThingFromItemDetails('[Components]', itemsArray);
  itemsArray = getThingFromItemDetails('[Augments]', itemsArray);
  return itemsArray;
}

function getItemNames(itemsArray) {
  for (const item of itemsArray) {
    item.name = item.details.split('\n')[0];
  }
  return itemsArray;
}

function getThingFromItemDetails(skillCompOrAug, itemsArray) {
  if (skillCompOrAug !== '[Granted Skills]' && skillCompOrAug !== '[Components]' && skillCompOrAug !== '[Augments]') {
    console.log('getThingFromItemDetails(): Error - skillCompOrAug was invalid.');
    return;
  }

  let key = '';
  switch (skillCompOrAug) {
    case '[Granted Skills]':
      key = 'grantedSkills';
      break;
    case '[Components]':
      key = 'component';
      break;
    case '[Augments]':
      key = 'augment';
      break;
    default:
      return;
  }

  for (const item of itemsArray) {
    item[key] = [];

    const splitString = item.details.split(skillCompOrAug + '\n');

    if (splitString.length === 1) continue;

    for (let i = 1; i < splitString.length; i++) {
      const itemThing = splitString[i].includes('\n\n') ? splitString[i].split('\n\n')[0] : splitString[i];
      const itemName = itemThing.split('\n')[0].includes(' (') ? itemThing.split(' (')[0] : itemThing.split('\n')[0];
      item[key].push({
        name: itemName,
        details: itemThing.replaceAll(itemName + '\n', ''), // remove name from description
      });
    }
    if (key === 'augment' || key === 'component') item[key] = item[key][0];
  }
  return itemsArray;
}

module.exports = {
  getClasses,
  isClassName,
  associateParentAndChildSkills,
  getDevotionSkills,
  formatItems,
};
