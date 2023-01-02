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

    // Handle exception:
    if (skill.name === `Ulzuin's Chosen`) continue;

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

function mapDevotionNodes(devotionNodes) {
  const constellationInfo = constellationMap();
  const newDevotionNodes = [];
  for (const node of devotionNodes) {
    newDevotionNodes.push({...node, ...constellationInfo[node.id]});
  }

  return newDevotionNodes;
}

function constellationMap() {
  return {
    sk2603: {constellationNumber: 110, devotionButton: 2},
    sk2604: {constellationNumber: 110, devotionButton: 3},
    sk2602: {constellationNumber: 110, devotionButton: 1},
    sk2607: {constellationNumber: 110, devotionButton: 6},
    sk2605: {constellationNumber: 110, devotionButton: 4},
    sk2606: {constellationNumber: 110, devotionButton: 5},
    sk1084: {constellationNumber: 74, devotionButton: 2},
    sk1085: {constellationNumber: 74, devotionButton: 3},
    sk1083: {constellationNumber: 74, devotionButton: 1},
    sk1088: {constellationNumber: 74, devotionButton: 6},
    sk1086: {constellationNumber: 74, devotionButton: 4},
    sk1087: {constellationNumber: 74, devotionButton: 5},
    sk1090: {constellationNumber: 75, devotionButton: 2},
    sk1091: {constellationNumber: 75, devotionButton: 3},
    sk1089: {constellationNumber: 75, devotionButton: 1},
    sk1094: {constellationNumber: 75, devotionButton: 6},
    sk1092: {constellationNumber: 75, devotionButton: 4},
    sk1093: {constellationNumber: 75, devotionButton: 5},
    sk1070: {constellationNumber: 72, devotionButton: 2},
    sk1071: {constellationNumber: 72, devotionButton: 3},
    sk1069: {constellationNumber: 72, devotionButton: 1},
    sk1074: {constellationNumber: 72, devotionButton: 6},
    sk1075: {constellationNumber: 72, devotionButton: 7},
    sk1072: {constellationNumber: 72, devotionButton: 4},
    sk1073: {constellationNumber: 72, devotionButton: 5},
    sk1077: {constellationNumber: 73, devotionButton: 2},
    sk1078: {constellationNumber: 73, devotionButton: 3},
    sk1076: {constellationNumber: 73, devotionButton: 1},
    sk1081: {constellationNumber: 73, devotionButton: 6},
    sk1082: {constellationNumber: 73, devotionButton: 7},
    sk1079: {constellationNumber: 73, devotionButton: 4},
    sk1080: {constellationNumber: 73, devotionButton: 5},
    sk1110: {constellationNumber: 78, devotionButton: 2},
    sk1111: {constellationNumber: 78, devotionButton: 3},
    sk1109: {constellationNumber: 78, devotionButton: 1},
    sk1114: {constellationNumber: 78, devotionButton: 6},
    sk1115: {constellationNumber: 78, devotionButton: 7},
    sk1112: {constellationNumber: 78, devotionButton: 4},
    sk1113: {constellationNumber: 78, devotionButton: 5},
    sk1023: {constellationNumber: 79, devotionButton: 2},
    sk1024: {constellationNumber: 79, devotionButton: 3},
    sk1022: {constellationNumber: 79, devotionButton: 1},
    sk1027: {constellationNumber: 79, devotionButton: 6},
    sk1025: {constellationNumber: 79, devotionButton: 4},
    sk1026: {constellationNumber: 79, devotionButton: 5},
    sk1096: {constellationNumber: 76, devotionButton: 2},
    sk1097: {constellationNumber: 76, devotionButton: 3},
    sk1095: {constellationNumber: 76, devotionButton: 1},
    sk1100: {constellationNumber: 76, devotionButton: 6},
    sk1101: {constellationNumber: 76, devotionButton: 7},
    sk1098: {constellationNumber: 76, devotionButton: 4},
    sk1099: {constellationNumber: 76, devotionButton: 5},
    sk1103: {constellationNumber: 77, devotionButton: 2},
    sk1104: {constellationNumber: 77, devotionButton: 3},
    sk1102: {constellationNumber: 77, devotionButton: 1},
    sk1107: {constellationNumber: 77, devotionButton: 6},
    sk1108: {constellationNumber: 77, devotionButton: 7},
    sk1105: {constellationNumber: 77, devotionButton: 4},
    sk1106: {constellationNumber: 77, devotionButton: 5},
    sk836: {constellationNumber: 85, devotionButton: 2},
    sk837: {constellationNumber: 85, devotionButton: 3},
    sk835: {constellationNumber: 85, devotionButton: 1},
    sk839: {constellationNumber: 86, devotionButton: 2},
    sk840: {constellationNumber: 86, devotionButton: 3},
    sk838: {constellationNumber: 86, devotionButton: 1},
    sk833: {constellationNumber: 84, devotionButton: 2},
    sk834: {constellationNumber: 84, devotionButton: 3},
    sk832: {constellationNumber: 84, devotionButton: 1},
    sk689: {constellationNumber: 3, devotionButton: 2},
    sk690: {constellationNumber: 3, devotionButton: 3},
    sk688: {constellationNumber: 3, devotionButton: 1},
    sk691: {constellationNumber: 3, devotionButton: 4},
    sk2021: {constellationNumber: 89, devotionButton: 2},
    sk2022: {constellationNumber: 89, devotionButton: 3},
    sk2020: {constellationNumber: 89, devotionButton: 1},
    sk2023: {constellationNumber: 89, devotionButton: 4},
    sk693: {constellationNumber: 4, devotionButton: 2},
    sk694: {constellationNumber: 4, devotionButton: 3},
    sk692: {constellationNumber: 4, devotionButton: 1},
    sk679: {constellationNumber: 1, devotionButton: 2},
    sk680: {constellationNumber: 1, devotionButton: 3},
    sk678: {constellationNumber: 1, devotionButton: 1},
    sk681: {constellationNumber: 1, devotionButton: 4},
    sk682: {constellationNumber: 1, devotionButton: 5},
    sk684: {constellationNumber: 2, devotionButton: 2},
    sk685: {constellationNumber: 2, devotionButton: 3},
    sk683: {constellationNumber: 2, devotionButton: 1},
    sk686: {constellationNumber: 2, devotionButton: 4},
    sk687: {constellationNumber: 2, devotionButton: 5},
    sk2017: {constellationNumber: 88, devotionButton: 2},
    sk2018: {constellationNumber: 88, devotionButton: 3},
    sk2016: {constellationNumber: 88, devotionButton: 1},
    sk2019: {constellationNumber: 88, devotionButton: 4},
    sk2563: {constellationNumber: 102, devotionButton: 2},
    sk2564: {constellationNumber: 102, devotionButton: 3},
    sk2562: {constellationNumber: 102, devotionButton: 1},
    sk2565: {constellationNumber: 102, devotionButton: 4},
    sk2567: {constellationNumber: 103, devotionButton: 2},
    sk2568: {constellationNumber: 103, devotionButton: 3},
    sk2566: {constellationNumber: 103, devotionButton: 1},
    sk2569: {constellationNumber: 103, devotionButton: 4},
    sk2080: {constellationNumber: 100, devotionButton: 2},
    sk2081: {constellationNumber: 100, devotionButton: 3},
    sk2079: {constellationNumber: 100, devotionButton: 1},
    sk2084: {constellationNumber: 100, devotionButton: 6},
    sk2082: {constellationNumber: 100, devotionButton: 4},
    sk2083: {constellationNumber: 100, devotionButton: 5},
    sk2086: {constellationNumber: 101, devotionButton: 2},
    sk2087: {constellationNumber: 101, devotionButton: 3},
    sk2085: {constellationNumber: 101, devotionButton: 1},
    sk2090: {constellationNumber: 101, devotionButton: 6},
    sk2088: {constellationNumber: 101, devotionButton: 4},
    sk2089: {constellationNumber: 101, devotionButton: 5},
    sk2591: {constellationNumber: 108, devotionButton: 2},
    sk2592: {constellationNumber: 108, devotionButton: 3},
    sk2590: {constellationNumber: 108, devotionButton: 1},
    sk2595: {constellationNumber: 108, devotionButton: 6},
    sk2593: {constellationNumber: 108, devotionButton: 4},
    sk2594: {constellationNumber: 108, devotionButton: 5},
    sk2597: {constellationNumber: 109, devotionButton: 2},
    sk2598: {constellationNumber: 109, devotionButton: 3},
    sk2596: {constellationNumber: 109, devotionButton: 1},
    sk2601: {constellationNumber: 109, devotionButton: 6},
    sk2599: {constellationNumber: 109, devotionButton: 4},
    sk2600: {constellationNumber: 109, devotionButton: 5},
    sk2579: {constellationNumber: 106, devotionButton: 2},
    sk2580: {constellationNumber: 106, devotionButton: 3},
    sk2578: {constellationNumber: 106, devotionButton: 1},
    sk2583: {constellationNumber: 106, devotionButton: 6},
    sk2581: {constellationNumber: 106, devotionButton: 4},
    sk2582: {constellationNumber: 106, devotionButton: 5},
    sk2585: {constellationNumber: 107, devotionButton: 2},
    sk2586: {constellationNumber: 107, devotionButton: 3},
    sk2584: {constellationNumber: 107, devotionButton: 1},
    sk2589: {constellationNumber: 107, devotionButton: 6},
    sk2587: {constellationNumber: 107, devotionButton: 4},
    sk2588: {constellationNumber: 107, devotionButton: 5},
    sk2571: {constellationNumber: 104, devotionButton: 2},
    sk2572: {constellationNumber: 104, devotionButton: 3},
    sk2570: {constellationNumber: 104, devotionButton: 1},
    sk2573: {constellationNumber: 104, devotionButton: 4},
    sk2575: {constellationNumber: 105, devotionButton: 2},
    sk2576: {constellationNumber: 105, devotionButton: 3},
    sk2574: {constellationNumber: 105, devotionButton: 1},
    sk2577: {constellationNumber: 105, devotionButton: 4},
    sk706: {constellationNumber: 7, devotionButton: 2},
    sk707: {constellationNumber: 7, devotionButton: 3},
    sk705: {constellationNumber: 7, devotionButton: 1},
    sk708: {constellationNumber: 7, devotionButton: 4},
    sk710: {constellationNumber: 8, devotionButton: 2},
    sk711: {constellationNumber: 8, devotionButton: 3},
    sk709: {constellationNumber: 8, devotionButton: 1},
    sk712: {constellationNumber: 8, devotionButton: 4},
    sk713: {constellationNumber: 8, devotionButton: 5},
    sk696: {constellationNumber: 5, devotionButton: 2},
    sk697: {constellationNumber: 5, devotionButton: 3},
    sk695: {constellationNumber: 5, devotionButton: 1},
    sk698: {constellationNumber: 5, devotionButton: 4},
    sk699: {constellationNumber: 5, devotionButton: 5},
    sk701: {constellationNumber: 6, devotionButton: 2},
    sk702: {constellationNumber: 6, devotionButton: 3},
    sk700: {constellationNumber: 6, devotionButton: 1},
    sk703: {constellationNumber: 6, devotionButton: 4},
    sk704: {constellationNumber: 6, devotionButton: 5},
    sk2033: {constellationNumber: 92, devotionButton: 2},
    sk2034: {constellationNumber: 92, devotionButton: 3},
    sk2032: {constellationNumber: 92, devotionButton: 1},
    sk2037: {constellationNumber: 92, devotionButton: 6},
    sk2035: {constellationNumber: 92, devotionButton: 4},
    sk2036: {constellationNumber: 92, devotionButton: 5},
    sk2039: {constellationNumber: 93, devotionButton: 2},
    sk2040: {constellationNumber: 93, devotionButton: 3},
    sk2038: {constellationNumber: 93, devotionButton: 1},
    sk2043: {constellationNumber: 93, devotionButton: 6},
    sk2041: {constellationNumber: 93, devotionButton: 4},
    sk2042: {constellationNumber: 93, devotionButton: 5},
    sk715: {constellationNumber: 9, devotionButton: 2},
    sk716: {constellationNumber: 9, devotionButton: 3},
    sk714: {constellationNumber: 9, devotionButton: 1},
    sk717: {constellationNumber: 9, devotionButton: 4},
    sk718: {constellationNumber: 9, devotionButton: 5},
    sk2025: {constellationNumber: 90, devotionButton: 2},
    sk2026: {constellationNumber: 90, devotionButton: 3},
    sk2024: {constellationNumber: 90, devotionButton: 1},
    sk2027: {constellationNumber: 90, devotionButton: 4},
    sk2029: {constellationNumber: 91, devotionButton: 2},
    sk2030: {constellationNumber: 91, devotionButton: 3},
    sk2028: {constellationNumber: 91, devotionButton: 1},
    sk2031: {constellationNumber: 91, devotionButton: 4},
    sk2056: {constellationNumber: 96, devotionButton: 2},
    sk2057: {constellationNumber: 96, devotionButton: 3},
    sk2055: {constellationNumber: 96, devotionButton: 1},
    sk2060: {constellationNumber: 96, devotionButton: 6},
    sk2058: {constellationNumber: 96, devotionButton: 4},
    sk2059: {constellationNumber: 96, devotionButton: 5},
    sk2062: {constellationNumber: 97, devotionButton: 2},
    sk2063: {constellationNumber: 97, devotionButton: 3},
    sk2061: {constellationNumber: 97, devotionButton: 1},
    sk2066: {constellationNumber: 97, devotionButton: 6},
    sk2064: {constellationNumber: 97, devotionButton: 4},
    sk2065: {constellationNumber: 97, devotionButton: 5},
    sk2045: {constellationNumber: 94, devotionButton: 2},
    sk2046: {constellationNumber: 94, devotionButton: 3},
    sk2044: {constellationNumber: 94, devotionButton: 1},
    sk2047: {constellationNumber: 94, devotionButton: 4},
    sk2048: {constellationNumber: 94, devotionButton: 5},
    sk2050: {constellationNumber: 95, devotionButton: 2},
    sk2051: {constellationNumber: 95, devotionButton: 3},
    sk2049: {constellationNumber: 95, devotionButton: 1},
    sk2054: {constellationNumber: 95, devotionButton: 6},
    sk2052: {constellationNumber: 95, devotionButton: 4},
    sk2053: {constellationNumber: 95, devotionButton: 5},
    sk2068: {constellationNumber: 98, devotionButton: 2},
    sk2069: {constellationNumber: 98, devotionButton: 3},
    sk2067: {constellationNumber: 98, devotionButton: 1},
    sk2072: {constellationNumber: 98, devotionButton: 6},
    sk2070: {constellationNumber: 98, devotionButton: 4},
    sk2071: {constellationNumber: 98, devotionButton: 5},
    sk2074: {constellationNumber: 99, devotionButton: 2},
    sk2075: {constellationNumber: 99, devotionButton: 3},
    sk2073: {constellationNumber: 99, devotionButton: 1},
    sk2078: {constellationNumber: 99, devotionButton: 6},
    sk2076: {constellationNumber: 99, devotionButton: 4},
    sk2077: {constellationNumber: 99, devotionButton: 5},
    sk808: {constellationNumber: 30, devotionButton: 2},
    sk809: {constellationNumber: 30, devotionButton: 3},
    sk807: {constellationNumber: 30, devotionButton: 1},
    sk810: {constellationNumber: 30, devotionButton: 4},
    sk812: {constellationNumber: 31, devotionButton: 2},
    sk813: {constellationNumber: 31, devotionButton: 3},
    sk811: {constellationNumber: 31, devotionButton: 1},
    sk814: {constellationNumber: 31, devotionButton: 4},
    sk815: {constellationNumber: 31, devotionButton: 5},
    sk825: {constellationNumber: 34, devotionButton: 2},
    sk826: {constellationNumber: 34, devotionButton: 3},
    sk824: {constellationNumber: 34, devotionButton: 1},
    sk827: {constellationNumber: 34, devotionButton: 4},
    sk828: {constellationNumber: 34, devotionButton: 5},
    sk830: {constellationNumber: 35, devotionButton: 2},
    sk831: {constellationNumber: 35, devotionButton: 3},
    sk829: {constellationNumber: 35, devotionButton: 1},
    sk817: {constellationNumber: 32, devotionButton: 2},
    sk818: {constellationNumber: 32, devotionButton: 3},
    sk816: {constellationNumber: 32, devotionButton: 1},
    sk819: {constellationNumber: 32, devotionButton: 4},
    sk820: {constellationNumber: 32, devotionButton: 5},
    sk822: {constellationNumber: 33, devotionButton: 2},
    sk823: {constellationNumber: 33, devotionButton: 3},
    sk821: {constellationNumber: 33, devotionButton: 1},
    sk853: {constellationNumber: 38, devotionButton: 2},
    sk854: {constellationNumber: 38, devotionButton: 3},
    sk852: {constellationNumber: 38, devotionButton: 1},
    sk857: {constellationNumber: 38, devotionButton: 6},
    sk855: {constellationNumber: 38, devotionButton: 4},
    sk856: {constellationNumber: 38, devotionButton: 5},
    sk859: {constellationNumber: 39, devotionButton: 2},
    sk860: {constellationNumber: 39, devotionButton: 3},
    sk858: {constellationNumber: 39, devotionButton: 1},
    sk863: {constellationNumber: 39, devotionButton: 6},
    sk864: {constellationNumber: 39, devotionButton: 7},
    sk861: {constellationNumber: 39, devotionButton: 4},
    sk862: {constellationNumber: 39, devotionButton: 5},
    sk842: {constellationNumber: 36, devotionButton: 2},
    sk843: {constellationNumber: 36, devotionButton: 3},
    sk841: {constellationNumber: 36, devotionButton: 1},
    sk844: {constellationNumber: 36, devotionButton: 4},
    sk845: {constellationNumber: 36, devotionButton: 5},
    sk847: {constellationNumber: 37, devotionButton: 2},
    sk848: {constellationNumber: 37, devotionButton: 3},
    sk846: {constellationNumber: 37, devotionButton: 1},
    sk851: {constellationNumber: 37, devotionButton: 6},
    sk849: {constellationNumber: 37, devotionButton: 4},
    sk850: {constellationNumber: 37, devotionButton: 5},
    sk872: {constellationNumber: 41, devotionButton: 2},
    sk873: {constellationNumber: 41, devotionButton: 3},
    sk871: {constellationNumber: 41, devotionButton: 1},
    sk876: {constellationNumber: 41, devotionButton: 6},
    sk877: {constellationNumber: 41, devotionButton: 7},
    sk874: {constellationNumber: 41, devotionButton: 4},
    sk875: {constellationNumber: 41, devotionButton: 5},
    sk879: {constellationNumber: 42, devotionButton: 2},
    sk880: {constellationNumber: 42, devotionButton: 3},
    sk878: {constellationNumber: 42, devotionButton: 1},
    sk883: {constellationNumber: 42, devotionButton: 6},
    sk884: {constellationNumber: 42, devotionButton: 7},
    sk881: {constellationNumber: 42, devotionButton: 4},
    sk882: {constellationNumber: 42, devotionButton: 5},
    sk866: {constellationNumber: 40, devotionButton: 2},
    sk867: {constellationNumber: 40, devotionButton: 3},
    sk865: {constellationNumber: 40, devotionButton: 1},
    sk870: {constellationNumber: 40, devotionButton: 6},
    sk868: {constellationNumber: 40, devotionButton: 4},
    sk869: {constellationNumber: 40, devotionButton: 5},
    sk899: {constellationNumber: 45, devotionButton: 2},
    sk900: {constellationNumber: 45, devotionButton: 3},
    sk898: {constellationNumber: 45, devotionButton: 1},
    sk903: {constellationNumber: 45, devotionButton: 6},
    sk901: {constellationNumber: 45, devotionButton: 4},
    sk902: {constellationNumber: 45, devotionButton: 5},
    sk905: {constellationNumber: 46, devotionButton: 2},
    sk906: {constellationNumber: 46, devotionButton: 3},
    sk904: {constellationNumber: 46, devotionButton: 1},
    sk907: {constellationNumber: 46, devotionButton: 4},
    sk908: {constellationNumber: 46, devotionButton: 5},
    sk886: {constellationNumber: 43, devotionButton: 2},
    sk887: {constellationNumber: 43, devotionButton: 3},
    sk885: {constellationNumber: 43, devotionButton: 1},
    sk890: {constellationNumber: 43, devotionButton: 6},
    sk891: {constellationNumber: 43, devotionButton: 7},
    sk888: {constellationNumber: 43, devotionButton: 4},
    sk889: {constellationNumber: 43, devotionButton: 5},
    sk893: {constellationNumber: 44, devotionButton: 2},
    sk894: {constellationNumber: 44, devotionButton: 3},
    sk892: {constellationNumber: 44, devotionButton: 1},
    sk897: {constellationNumber: 44, devotionButton: 6},
    sk895: {constellationNumber: 44, devotionButton: 4},
    sk896: {constellationNumber: 44, devotionButton: 5},
    sk922: {constellationNumber: 49, devotionButton: 2},
    sk923: {constellationNumber: 49, devotionButton: 3},
    sk921: {constellationNumber: 49, devotionButton: 1},
    sk926: {constellationNumber: 49, devotionButton: 6},
    sk927: {constellationNumber: 49, devotionButton: 7},
    sk924: {constellationNumber: 49, devotionButton: 4},
    sk925: {constellationNumber: 49, devotionButton: 5},
    sk910: {constellationNumber: 47, devotionButton: 2},
    sk911: {constellationNumber: 47, devotionButton: 3},
    sk909: {constellationNumber: 47, devotionButton: 1},
    sk912: {constellationNumber: 47, devotionButton: 4},
    sk913: {constellationNumber: 47, devotionButton: 5},
    sk915: {constellationNumber: 48, devotionButton: 2},
    sk916: {constellationNumber: 48, devotionButton: 3},
    sk914: {constellationNumber: 48, devotionButton: 1},
    sk919: {constellationNumber: 48, devotionButton: 6},
    sk920: {constellationNumber: 48, devotionButton: 7},
    sk917: {constellationNumber: 48, devotionButton: 4},
    sk918: {constellationNumber: 48, devotionButton: 5},
    sk943: {constellationNumber: 52, devotionButton: 2},
    sk944: {constellationNumber: 52, devotionButton: 3},
    sk942: {constellationNumber: 52, devotionButton: 1},
    sk945: {constellationNumber: 52, devotionButton: 4},
    sk946: {constellationNumber: 52, devotionButton: 5},
    sk948: {constellationNumber: 53, devotionButton: 2},
    sk949: {constellationNumber: 53, devotionButton: 3},
    sk947: {constellationNumber: 53, devotionButton: 1},
    sk952: {constellationNumber: 53, devotionButton: 6},
    sk950: {constellationNumber: 53, devotionButton: 4},
    sk951: {constellationNumber: 53, devotionButton: 5},
    sk929: {constellationNumber: 50, devotionButton: 2},
    sk930: {constellationNumber: 50, devotionButton: 3},
    sk928: {constellationNumber: 50, devotionButton: 1},
    sk933: {constellationNumber: 50, devotionButton: 6},
    sk934: {constellationNumber: 50, devotionButton: 7},
    sk931: {constellationNumber: 50, devotionButton: 4},
    sk932: {constellationNumber: 50, devotionButton: 5},
    sk936: {constellationNumber: 51, devotionButton: 2},
    sk937: {constellationNumber: 51, devotionButton: 3},
    sk935: {constellationNumber: 51, devotionButton: 1},
    sk940: {constellationNumber: 51, devotionButton: 6},
    sk941: {constellationNumber: 51, devotionButton: 7},
    sk938: {constellationNumber: 51, devotionButton: 4},
    sk939: {constellationNumber: 51, devotionButton: 5},
    sk965: {constellationNumber: 56, devotionButton: 2},
    sk966: {constellationNumber: 56, devotionButton: 3},
    sk964: {constellationNumber: 56, devotionButton: 1},
    sk967: {constellationNumber: 56, devotionButton: 4},
    sk968: {constellationNumber: 56, devotionButton: 5},
    sk970: {constellationNumber: 57, devotionButton: 2},
    sk971: {constellationNumber: 57, devotionButton: 3},
    sk969: {constellationNumber: 57, devotionButton: 1},
    sk974: {constellationNumber: 57, devotionButton: 6},
    sk972: {constellationNumber: 57, devotionButton: 4},
    sk973: {constellationNumber: 57, devotionButton: 5},
    sk954: {constellationNumber: 54, devotionButton: 2},
    sk955: {constellationNumber: 54, devotionButton: 3},
    sk953: {constellationNumber: 54, devotionButton: 1},
    sk956: {constellationNumber: 54, devotionButton: 4},
    sk957: {constellationNumber: 54, devotionButton: 5},
    sk959: {constellationNumber: 55, devotionButton: 2},
    sk960: {constellationNumber: 55, devotionButton: 3},
    sk958: {constellationNumber: 55, devotionButton: 1},
    sk963: {constellationNumber: 55, devotionButton: 6},
    sk961: {constellationNumber: 55, devotionButton: 4},
    sk962: {constellationNumber: 55, devotionButton: 5},
    sk976: {constellationNumber: 58, devotionButton: 2},
    sk977: {constellationNumber: 58, devotionButton: 3},
    sk975: {constellationNumber: 58, devotionButton: 1},
    sk980: {constellationNumber: 58, devotionButton: 6},
    sk978: {constellationNumber: 58, devotionButton: 4},
    sk979: {constellationNumber: 58, devotionButton: 5},
    sk982: {constellationNumber: 59, devotionButton: 2},
    sk983: {constellationNumber: 59, devotionButton: 3},
    sk981: {constellationNumber: 59, devotionButton: 1},
    sk986: {constellationNumber: 59, devotionButton: 6},
    sk984: {constellationNumber: 59, devotionButton: 4},
    sk985: {constellationNumber: 59, devotionButton: 5},
    sk988: {constellationNumber: 60, devotionButton: 2},
    sk989: {constellationNumber: 60, devotionButton: 3},
    sk987: {constellationNumber: 60, devotionButton: 1},
    sk992: {constellationNumber: 60, devotionButton: 6},
    sk990: {constellationNumber: 60, devotionButton: 4},
    sk991: {constellationNumber: 60, devotionButton: 5},
    sk1005: {constellationNumber: 63, devotionButton: 2},
    sk1006: {constellationNumber: 63, devotionButton: 3},
    sk1004: {constellationNumber: 63, devotionButton: 1},
    sk1009: {constellationNumber: 63, devotionButton: 6},
    sk1007: {constellationNumber: 63, devotionButton: 4},
    sk1008: {constellationNumber: 63, devotionButton: 5},
    sk1011: {constellationNumber: 64, devotionButton: 2},
    sk1012: {constellationNumber: 64, devotionButton: 3},
    sk1010: {constellationNumber: 64, devotionButton: 1},
    sk1015: {constellationNumber: 64, devotionButton: 6},
    sk1016: {constellationNumber: 64, devotionButton: 7},
    sk1013: {constellationNumber: 64, devotionButton: 4},
    sk1014: {constellationNumber: 64, devotionButton: 5},
    sk994: {constellationNumber: 61, devotionButton: 2},
    sk995: {constellationNumber: 61, devotionButton: 3},
    sk993: {constellationNumber: 61, devotionButton: 1},
    sk996: {constellationNumber: 61, devotionButton: 4},
    sk997: {constellationNumber: 61, devotionButton: 5},
    sk999: {constellationNumber: 62, devotionButton: 2},
    sk1000: {constellationNumber: 62, devotionButton: 3},
    sk998: {constellationNumber: 62, devotionButton: 1},
    sk1003: {constellationNumber: 62, devotionButton: 6},
    sk1001: {constellationNumber: 62, devotionButton: 4},
    sk1002: {constellationNumber: 62, devotionButton: 5},
    sk1041: {constellationNumber: 67, devotionButton: 8},
    sk1035: {constellationNumber: 67, devotionButton: 2},
    sk1036: {constellationNumber: 67, devotionButton: 3},
    sk1034: {constellationNumber: 67, devotionButton: 1},
    sk1039: {constellationNumber: 67, devotionButton: 6},
    sk1040: {constellationNumber: 67, devotionButton: 7},
    sk1037: {constellationNumber: 67, devotionButton: 4},
    sk1038: {constellationNumber: 67, devotionButton: 5},
    sk1043: {constellationNumber: 68, devotionButton: 2},
    sk1044: {constellationNumber: 68, devotionButton: 3},
    sk1042: {constellationNumber: 68, devotionButton: 1},
    sk1047: {constellationNumber: 68, devotionButton: 6},
    sk1048: {constellationNumber: 68, devotionButton: 7},
    sk1045: {constellationNumber: 68, devotionButton: 4},
    sk1046: {constellationNumber: 68, devotionButton: 5},
    sk1018: {constellationNumber: 65, devotionButton: 2},
    sk1019: {constellationNumber: 65, devotionButton: 3},
    sk1017: {constellationNumber: 65, devotionButton: 1},
    sk1020: {constellationNumber: 65, devotionButton: 4},
    sk1021: {constellationNumber: 65, devotionButton: 5},
    sk1029: {constellationNumber: 66, devotionButton: 2},
    sk1030: {constellationNumber: 66, devotionButton: 3},
    sk1028: {constellationNumber: 66, devotionButton: 1},
    sk1033: {constellationNumber: 66, devotionButton: 6},
    sk1031: {constellationNumber: 66, devotionButton: 4},
    sk1032: {constellationNumber: 66, devotionButton: 5},
    sk1050: {constellationNumber: 69, devotionButton: 2},
    sk1051: {constellationNumber: 69, devotionButton: 3},
    sk1049: {constellationNumber: 69, devotionButton: 1},
    sk1054: {constellationNumber: 69, devotionButton: 6},
    sk1055: {constellationNumber: 69, devotionButton: 7},
    sk1052: {constellationNumber: 69, devotionButton: 4},
    sk1053: {constellationNumber: 69, devotionButton: 5},
    sk1057: {constellationNumber: 70, devotionButton: 2},
    sk1058: {constellationNumber: 70, devotionButton: 3},
    sk1056: {constellationNumber: 70, devotionButton: 1},
    sk1061: {constellationNumber: 70, devotionButton: 6},
    sk1062: {constellationNumber: 70, devotionButton: 7},
    sk1059: {constellationNumber: 70, devotionButton: 4},
    sk1060: {constellationNumber: 70, devotionButton: 5},
    sk1064: {constellationNumber: 71, devotionButton: 2},
    sk1065: {constellationNumber: 71, devotionButton: 3},
    sk1063: {constellationNumber: 71, devotionButton: 1},
    sk1068: {constellationNumber: 71, devotionButton: 6},
    sk1066: {constellationNumber: 71, devotionButton: 4},
    sk1067: {constellationNumber: 71, devotionButton: 5},
    sk728: {constellationNumber: 12, devotionButton: 2},
    sk729: {constellationNumber: 12, devotionButton: 3},
    sk727: {constellationNumber: 12, devotionButton: 1},
    sk730: {constellationNumber: 12, devotionButton: 4},
    sk732: {constellationNumber: 13, devotionButton: 2},
    sk733: {constellationNumber: 13, devotionButton: 3},
    sk731: {constellationNumber: 13, devotionButton: 1},
    sk734: {constellationNumber: 13, devotionButton: 4},
    sk720: {constellationNumber: 10, devotionButton: 2},
    sk721: {constellationNumber: 10, devotionButton: 3},
    sk719: {constellationNumber: 10, devotionButton: 1},
    sk722: {constellationNumber: 10, devotionButton: 4},
    sk723: {constellationNumber: 10, devotionButton: 5},
    sk725: {constellationNumber: 11, devotionButton: 2},
    sk726: {constellationNumber: 11, devotionButton: 3},
    sk724: {constellationNumber: 11, devotionButton: 1},
    sk745: {constellationNumber: 16, devotionButton: 2},
    sk746: {constellationNumber: 16, devotionButton: 3},
    sk744: {constellationNumber: 16, devotionButton: 1},
    sk747: {constellationNumber: 16, devotionButton: 4},
    sk749: {constellationNumber: 17, devotionButton: 2},
    sk750: {constellationNumber: 17, devotionButton: 3},
    sk748: {constellationNumber: 17, devotionButton: 1},
    sk751: {constellationNumber: 17, devotionButton: 4},
    sk736: {constellationNumber: 14, devotionButton: 2},
    sk737: {constellationNumber: 14, devotionButton: 3},
    sk735: {constellationNumber: 14, devotionButton: 1},
    sk738: {constellationNumber: 14, devotionButton: 4},
    sk753: {constellationNumber: 18, devotionButton: 2},
    sk754: {constellationNumber: 18, devotionButton: 3},
    sk752: {constellationNumber: 18, devotionButton: 1},
    sk755: {constellationNumber: 18, devotionButton: 4},
    sk756: {constellationNumber: 18, devotionButton: 5},
    sk758: {constellationNumber: 19, devotionButton: 2},
    sk759: {constellationNumber: 19, devotionButton: 3},
    sk757: {constellationNumber: 19, devotionButton: 1},
    sk760: {constellationNumber: 19, devotionButton: 4},
    sk761: {constellationNumber: 19, devotionButton: 5},
    sk763: {constellationNumber: 20, devotionButton: 2},
    sk764: {constellationNumber: 20, devotionButton: 3},
    sk762: {constellationNumber: 20, devotionButton: 1},
    sk765: {constellationNumber: 20, devotionButton: 4},
    sk766: {constellationNumber: 20, devotionButton: 5},
    sk777: {constellationNumber: 23, devotionButton: 2},
    sk778: {constellationNumber: 23, devotionButton: 3},
    sk776: {constellationNumber: 23, devotionButton: 1},
    sk779: {constellationNumber: 23, devotionButton: 4},
    sk781: {constellationNumber: 24, devotionButton: 2},
    sk782: {constellationNumber: 24, devotionButton: 3},
    sk780: {constellationNumber: 24, devotionButton: 1},
    sk783: {constellationNumber: 24, devotionButton: 4},
    sk768: {constellationNumber: 21, devotionButton: 2},
    sk769: {constellationNumber: 21, devotionButton: 3},
    sk767: {constellationNumber: 21, devotionButton: 1},
    sk770: {constellationNumber: 21, devotionButton: 4},
    sk771: {constellationNumber: 21, devotionButton: 5},
    sk773: {constellationNumber: 22, devotionButton: 2},
    sk774: {constellationNumber: 22, devotionButton: 3},
    sk772: {constellationNumber: 22, devotionButton: 1},
    sk775: {constellationNumber: 22, devotionButton: 4},
    sk795: {constellationNumber: 27, devotionButton: 2},
    sk796: {constellationNumber: 27, devotionButton: 3},
    sk794: {constellationNumber: 27, devotionButton: 1},
    sk798: {constellationNumber: 28, devotionButton: 2},
    sk799: {constellationNumber: 28, devotionButton: 3},
    sk797: {constellationNumber: 28, devotionButton: 1},
    sk800: {constellationNumber: 28, devotionButton: 4},
    sk801: {constellationNumber: 28, devotionButton: 5},
    sk785: {constellationNumber: 25, devotionButton: 2},
    sk786: {constellationNumber: 25, devotionButton: 3},
    sk784: {constellationNumber: 25, devotionButton: 1},
    sk787: {constellationNumber: 25, devotionButton: 4},
    sk788: {constellationNumber: 25, devotionButton: 5},
    sk790: {constellationNumber: 26, devotionButton: 2},
    sk791: {constellationNumber: 26, devotionButton: 3},
    sk789: {constellationNumber: 26, devotionButton: 1},
    sk792: {constellationNumber: 26, devotionButton: 4},
    sk793: {constellationNumber: 26, devotionButton: 5},
    sk803: {constellationNumber: 29, devotionButton: 2},
    sk804: {constellationNumber: 29, devotionButton: 3},
    sk802: {constellationNumber: 29, devotionButton: 1},
    sk805: {constellationNumber: 29, devotionButton: 4},
    sk806: {constellationNumber: 29, devotionButton: 5},
    sk739: {constellationNumber: 15, devotionButton: 1},
    sk740: {constellationNumber: 80, devotionButton: 1},
    sk741: {constellationNumber: 81, devotionButton: 1},
    sk742: {constellationNumber: 82, devotionButton: 1},
    sk743: {constellationNumber: 83, devotionButton: 1},
  };
}

module.exports = {
  getClasses,
  isClassName,
  associateParentAndChildSkills,
  getDevotionSkills,
  formatItems,
  mapDevotionNodes,
};
