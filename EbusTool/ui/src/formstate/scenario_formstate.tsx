import {VehicleType} from '../helper/types';
import {AussieState} from '../helper/aussie_states';
import { loadFromLocalStorage } from '../helper/localStorageHelpers';

export type ScenarioFormState = {
  gtfs: string | undefined;
  state: AussieState | undefined;
  importPath: string | undefined;
  agency: string | undefined;
  vehicleType: VehicleType | undefined;
};

export function getNewScenarioFormState(): ScenarioFormState {
  const formState = {
    gtfs: undefined,
    state: undefined,
    agency: undefined,
    vehicleType: undefined,
    importPath: undefined,
  };

  return formState;
}

export function getSavedOrNewScenarioForm() : ScenarioFormState{
  const fromLocalStorage  = loadFromLocalStorage();
  console.log("Loaded scenario form state is: ",fromLocalStorage.scenario)
  return fromLocalStorage.scenario ?? getNewScenarioFormState();
}

const formStateForKey = getNewScenarioFormState();
export type ScenFormStateKey = keyof typeof formStateForKey;

export function isScenarioFormKey(value: string): value is ScenFormStateKey {
  return value in formStateForKey === true;
}
