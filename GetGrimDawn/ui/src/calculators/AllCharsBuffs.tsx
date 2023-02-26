import {Character, OverviewSkill} from '../types/types';

type DominantDuplicates = {[index: string]: OverviewSkill};

export function getDominantDebuffs(chars: Character[]) {
  // Determine the dominant debuffs across all characters,
  // based on the highest buffed level of a skill or where relevant,
  // the highgest buffed level of the skills' parent.

  const allDebuffs: OverviewSkill[] = [];
  // console.log('DEBUFFS FOUND: ');
  for (let i = 0; i < chars.length; i++) {
    for (const debuff of chars[i].teamSkills.debuffs) {
      allDebuffs.push({...debuff, charIndex: i});
    }
  }
  const dominantDuplicates: DominantDuplicates = {};
  const dominantDuplicateParents: DominantDuplicates = {};

  for (const debuff of allDebuffs) {
    // If the dominant debuff has been found amongst duplicates

    if (dominantDuplicates[debuff.name]) continue;
    if (dominantDuplicateParents[debuff.name]) continue;

    // console.log('\n------');
    // console.log(`${debuff.name} of charIndex: ${debuff.charIndex}`);
    // Identify duplicates:
    const duplicates = [...allDebuffs].filter((db) => db.name === debuff.name);
    if (duplicates.length < 2) {
      // console.log('No duplicates found');
      continue;
    }

    // console.log('Duplicates found: ');

    if (isParent(debuff, chars)) {
      // Get the highest version of this debuff
      const domDebuff = duplicates.reduce((prev, curr) => (curr.buffedLevel > prev.buffedLevel ? curr : prev));
      dominantDuplicateParents[domDebuff.name] = domDebuff;
      // console.log('\n------');
      // console.log(
      //   `DomParent Found: ${domDebuff.name} of Character Index {${domDebuff.charIndex}} with buffedLevel ${domDebuff.buffedLevel}`
      // );
      continue;
    }

    // At this point, the skill is NOT a parent
    const parentSkill = getParent(debuff, chars)[0];
    const parentIsDebuff = parentSkill.debuffs.length > 0 ? true : false;
    const dominantDebuffParent = getDominantParent(parentSkill.name, allDebuffs);

    // console.log('Parent skill is: ', parentSkill.name);
    // console.log('ParentIsDebuff: ', parentIsDebuff);

    // If both the child is a debuff, and the parent is a debuff...
    if (parentIsDebuff && !dominantDuplicateParents[dominantDebuffParent.name]) {
      // Set the parent
      dominantDuplicateParents[dominantDebuffParent.name] = dominantDebuffParent;
      // Get dominant child debuff (based on dominant parent debuff)
      const childDebuff = dominantDebuffParent.children?.filter((child) => child.name === debuff.name)[0];
      if (childDebuff) {
        // Set the child
        dominantDuplicates[childDebuff.name] = {...childDebuff, charIndex: dominantDebuffParent.charIndex};
      }
    } else {
      // If the debuff's parent is not a debuff, find the duplicate debuff with the highgest parent buffedLevel.
      const dominantChildDebuff = dominantDebuffParent.children?.filter((skill) => skill.name === debuff.name)[0];
      if (dominantChildDebuff)
        // Set the child
        dominantDuplicates[debuff.name] = {...dominantChildDebuff, charIndex: dominantDebuffParent.charIndex};
    }
  }

  // console.log('-- Children:');
  // console.log(dominantDuplicates);
  // console.log('-- Parents:');
  // console.log(dominantDuplicateParents);

  return removeDuplicateDebuffs(allDebuffs, {...dominantDuplicates, ...dominantDuplicateParents});
}

function getDominantParent(parentSkillName: string, allDebuffs: OverviewSkill[]) {
  const duplicateParents = [...allDebuffs].filter((skill) => skill.name === parentSkillName);
  const domDebuffParent = duplicateParents.reduce((prev, curr) => (curr.buffedLevel > prev.buffedLevel ? curr : prev));

  return domDebuffParent;
}

function getParent(skill: OverviewSkill, chars: Character[]) {
  const parentSkill = chars[skill.charIndex].skills.filter((sk) => {
    const parent = sk.children?.filter((child) => child.name === skill.name);
    if (parent && parent.length) {
      return sk;
    }
  });

  return parentSkill;
}

function isParent(skill: OverviewSkill, chars: Character[]) {
  const parentSkill = getParent(skill, chars);
  // console.log(`isParent(): debuff is: ${skill.name}, parent is: ${parentSkill[0] ? parentSkill[0].name : 'n/a'}`);
  return parentSkill.length ? false : true;
}

function removeDuplicateDebuffs(allDebuffs: OverviewSkill[], domDupes: DominantDuplicates) {
  let refinedDebuffs = [...allDebuffs];

  for (const key of Object.keys(domDupes)) {
    // Remove all with that name
    refinedDebuffs = refinedDebuffs.filter((db) => db.name !== key);
    // Add the dominant skill by that name
    refinedDebuffs.push(domDupes[key]);
  }

  // console.log('All debuffs with no duplicates:');
  // refinedDebuffs.forEach((db) => console.log(db.name));

  return refinedDebuffs;
}

export function getDominantBuffs(chars: Character[]) {
  // Get all buffs and charIndexes
  const allBuffs: OverviewSkill[] = [];
  for (let i = 0; i < chars.length; i++) {
    for (const skill of chars[i].teamSkills.allSkills) {
      allBuffs.push({...skill, charIndex: i});
    }
  }

  const dominantBuffs: {[index: string]: OverviewSkill} = {};
  for (const buff of allBuffs) {
    if (!dominantBuffs[buff.name]) {
      dominantBuffs[buff.name] = buff;
    } else {
      if (dominantBuffs[buff.name].buffedLevel > buff.buffedLevel) {
        continue;
      }
      dominantBuffs[buff.name] = buff;
    }
  }

  const refinedBuffs = Object.keys(dominantBuffs).map((key) => dominantBuffs[key]);

  return refinedBuffs;
}
