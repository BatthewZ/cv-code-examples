import {Character} from '../types/types';

export function saveCharToLocalStorage(characters: Character[]) {
  localStorage.setItem('characters', JSON.stringify(characters));
}

export function loadSavedChars(): Character[] {
  const chars = localStorage.getItem('characters');
  if (chars) return JSON.parse(chars);
  return [];
}
