// import {FormState} from '../FormState/formState';
// import {ScenFormState} from '../FormState/scenarioFormState';
// import {FormName} from './types';

import { CharFormStateKey } from '../formstate/characteristics_formstate';
import {getNewScenarioFormState, ScenarioFormState, ScenFormStateKey} from '../formstate/scenario_formstate';
import {FormName} from './types';

const USER_SETTINGS = 'userSettings';

export function saveToLocalStorage(formState: ScenarioFormState, scenOrChar: FormName) {
  const currentStorage = loadFromLocalStorage();
  currentStorage[scenOrChar] = formState;
  localStorage.setItem(USER_SETTINGS, JSON.stringify(currentStorage));
}

export function setSaveUserInfo(){
  const currentStorage = loadFromLocalStorage();
  currentStorage['saved'] = true;
  localStorage.setItem(USER_SETTINGS, JSON.stringify(currentStorage));
}

export function toggleSaveUserInfo() {
  const currentStorage = loadFromLocalStorage();
  currentStorage['saved'] = !currentStorage['saved'];
  localStorage.setItem(USER_SETTINGS, JSON.stringify(currentStorage));
}

export function clearUserSettings() {
  console.log('clearing user settings');
  localStorage.setItem(USER_SETTINGS, JSON.stringify({saved: false}));
}

export function loadFromLocalStorage() {
  const infoFromLocalStorage = localStorage.getItem(USER_SETTINGS);
  let myStorage = infoFromLocalStorage ? JSON.parse(infoFromLocalStorage) : {saved: false};
  return myStorage;
}

export function getDefaultChecked(formKey: ScenFormStateKey | CharFormStateKey){
  // Might not need this
  const savedSettings = loadFromLocalStorage();
  const savedSetting = savedSettings.scenario[formKey] ?? savedSettings.characteristics[formKey];
  return savedSetting;
}

