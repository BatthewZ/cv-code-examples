//   const all = `charName, characterClass, level, race, alignment, experience, background, proficiencyBonus, weapon, weaponDamage, hpMax, hpCurr, hitDie, tempHp, ac, initiative, speed, otherProficiencies, languages, equipment, attacksAndSpells, `;
//   const attributes = `strength, dexterity, constitution, intelligence, wisdom, charisma`;

import {getPositionOfLineAndCharacter} from 'typescript';

//   const allThings = all + attributes;
//   let myCode = '';

//   const subset = 'weapon, weaponDamage, hpMax, hpCurr, hitDie, tempHp, ac, initiative, speed';

//   for (const thing of subset.split(', ')) {
//     const title = capitalizeFirstLetter(thing);
//     myCode += `<EditableText fieldName={'${thing}'} value={${thing} + ''} confirmEdit={set${title}} title={'${title}'} />\n`;
//   }
//   console.log(myCode);

export function makeMyCode() {
  // const itemsArr: string[] = ['username', 'adminRegisterkey', 'password', 'repeatpassword'];
  // let myCode = makeForm(itemsArr);

  const allCharProps = `charId otherProficiencies `;
  const skills = `skillProfs proficiencyBonus savingThrowProfs `;
  const attributes = `strength dexterity constitution intelligence wisdom charisma `;
  const charInfo = `charName characterClass level race alignment experience background `;
  const hp = `hpMax hpCurr hitDie tempHp `;
  const combatStats = `ac initiative speed`;
  const weapons = 'weapons '; // []
  const equipment = 'equipment '; // []
  const attacksAndSpells = 'attacksAndSpells '; // []
  const languages = 'languages '; // []
  const otherProficiencies = 'otherProficiencies'; // []

  let headings = (
    allCharProps +
    skills +
    attributes +
    charInfo +
    hp +
    combatStats +
    weapons +
    equipment +
    attacksAndSpells +
    languages +
    otherProficiencies
  ).split(' ');

  let myCode = '';

  for (const i of headings) {
    myCode += `${i}: '',\n`;
  }

  console.log(myCode);
}

function makeForm(items: string[]) {
  let myCode = makeStateCodeFromArr(items) + '\n\n';
  myCode += makeValidationCode(items) + '\n\n';
  myCode += `return (<div>\n`;
  myCode += makeTextInputs(items);
  myCode += '</div>);';

  return myCode;
}

function makeStateCodeFromArr(items: string[]) {
  let myCode = '';
  for (const item of items) {
    myCode += makeStateCode(item);
  }

  return myCode;
}

function makeTextInputs(items: string[]) {
  let myCode = '';
  for (const item of items) {
    const capitalizedItem = capitaliseFirstLetter(item);
    myCode += `<TextInput type="text" name="${item}" label="${capitalizedItem}" placeholder="${capitalizedItem}" updateState={set${capitalizedItem}} />\n`;
  }
  return myCode;
}

function makeStateCode(item: string) {
  return `const [${item.toLocaleLowerCase()}, set${capitaliseFirstLetter(item)}] = useState('');\n`;
}

export function makeValidationCode(itemsArr: string[]) {
  let stringOfItems = '[';
  for (const item of itemsArr) {
    stringOfItems += `"${item}",`;
  }

  stringOfItems += ']';

  let myCode = `function fieldsAreValid(){
      clearErrorMessages(${stringOfItems});
      let isValid = true;
    `;
  for (const item of itemsArr) {
    myCode += `if (!${item}){\n\tsetErrorMessage('${item}', 'Please enter a valid ${item}');\nisValid = false;\n}\n`;
  }

  for (const item of itemsArr) {
    myCode += `if (${item}.length > 50){\n\tsetErrorMessage('${item}', '${item} cannot be more than 50 characters long');\nisValid = false;\n}\n`;
  }

  myCode += 'return isValid;\n}';

  return myCode;
}

function capitaliseFirstLetter(s: string) {
  if (!s || s.length <= 1) return;

  return s.charAt(0).toUpperCase() + s.substring(1, s.length).toLowerCase();
}

// -------------------
// let myCode = '';

// let myCode = makeStateCodeFromArr(queryPage);

// for (const item of itemsArr) {
//   // myCode += `.btn-${item}{\n\tbackground-color: var(--${item});\n}\n`;
//   myCode += `const [${item.toLocaleLowerCase()}, set${item}] = useState('');\n`;
// }
// for (const item of itemsArr) {
//   myCode += `if (${item}.length > 50){\n\tsetErrorMessage('${item}', '${item} cannot be more than 50 characters long');\nisValid = false;\n}\n`;
// }

// -------------------

// const allColors = [
//   'brightTeal',
//   'mildTeal',
//   'teal',
//   'darkTeal',
//   'lightBlue',
//   'blue',
//   'skyBlue',
//   'highlighterPink',
//   'blonde',
//   'pink',
// ];
