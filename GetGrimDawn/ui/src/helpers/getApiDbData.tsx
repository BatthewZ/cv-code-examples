import {Item} from '../types/types';

// This file and these methods are currently implemented in the backend.
// I was considering moving them to the front end to reduce the timeout rates
// (timeouts due to > 30s waits on responses)

export async function getItemDbDetails(items: Item[], grimToolsURL: string) {
  const apiChar = await getApiDbData(grimToolsURL);
  if (!apiChar) console.log('Something went wrong getting API char.');
  return apiChar ? addItemDbDetails(items, apiChar.data.equipment) : items;
}

async function getApiDbData(charUrl: string) {
  console.log('Char url is: ', charUrl);
  try {
    // example id: https://www.grimtools.com/calc/0V01Mv9Z == 0V01Mv9Z

    const charId = charUrl.split('calc/')[1];
    const apiUrl = 'https://www.grimtools.com/get_build_data.php?id=' + charId;

    const response = await fetch(apiUrl, {mode: 'no-cors'});
    return await response.json();
    // return apiChar;
  } catch (e) {
    console.log('Something went wrong getting teh API character: ', e);
  }
}

function addItemDbDetails(items: Item[], equipmentFromApi: any) {
  for (const item of items) {
    const dbItem = equipmentFromApi[item.slot];
    if (!dbItem) continue;
    if (dbItem['prefix']) item.prefix = dbItem['prefix'];
    if (dbItem['suffix']) item.suffix = dbItem['suffix'];
  }
  return items;
}
