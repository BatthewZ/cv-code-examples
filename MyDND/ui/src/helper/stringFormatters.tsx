// -------- String Formatters

export function camelCase(s: string) {
  if (!s) return;
  if (!s.trim().includes(' ')) return s.trim().toLowerCase();
  const strArr = s.split(' ');

  let camelCase = strArr[0].toLowerCase();

  for (let i = 1; i < strArr.length; i++) {
    if (strArr[i]) {
      camelCase += capitalizeFirstLetter(strArr[i]);
    }
  }
  return camelCase;
}

export function capitalizeFirstLetter(s: string) {
  if (!s || s.length <= 1) return s;

  return s.charAt(0).toUpperCase() + s.substring(1, s.length).toLowerCase();
}

export function capitalizeAllFirstLetters(s: string) {
  if (!s) return s;
  if (!s.trim().includes(' ')) return capitalizeFirstLetter(s);

  let capitalised = '';
  for (const word of s.split(' ')) {
    capitalised += capitalizeFirstLetter(word) + ' ';
  }
  return capitalised;
}

export function truncateText(text: string, charLimit: number, ellipsis = false) {
  if (!text) return text;

  let newText = text.substring(0, charLimit);

  if (text.length > charLimit && ellipsis) {
    newText = newText.substring(0, newText.length - 1) + '...';
  }

  return newText;
}
