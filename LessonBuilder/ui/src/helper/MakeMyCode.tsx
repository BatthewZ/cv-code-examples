export function makeMyCode() {
  // const itemsArr: string[] = ['email', 'password'];
  // const queryPage: string[] = ['title', 'year', 'artist'];
  // let myCode = makeForm(itemsArr);

  let myCode = `--blue: #3d5a80;
  --darkBlue: #2f4664;
  --darkestBlue: #1a365c;
  --palestBlue: #e0fbfc;
  --pink: #ff4365;
  --paleOrange: #edbbb4;
  --lightishBlue: #69a3c5;
  --lightBlue: #98c1d9;`;

  let newCode = '';
  for (const line of myCode.split('\n')) {
    let varName = line.trim().replaceAll('--', '').split(':')[0];

    newCode += `.${varName}{\n\tcolor: var(--${varName})\n}\n`;
  }

  console.log(newCode);
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
    myCode += `<TextInput type="text" name="${item}" label="${capitaliseFirstLetter(
      item
    )}" placeholder="${capitaliseFirstLetter(item)}" updateState={() => {}} />\n`;
  }
  return myCode;
}

function makeStateCode(item: string) {
  return `const [${item.toLocaleLowerCase()}, set${item}] = useState('');\n`;
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
