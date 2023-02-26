import {Character} from '../types/types';

export function downloadTeamSummary(allCharacters: Character[]) {
  const element = document.createElement('a');
  const file = new Blob([JSON.stringify(allCharacters)], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = 'charSummaryData.txt';
  document.body.appendChild(element);
  element.click();
  element.remove();
}
