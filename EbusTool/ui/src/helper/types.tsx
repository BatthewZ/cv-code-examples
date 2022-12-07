import {CharFormStateKey} from '../formstate/characteristics_formstate';
import {ScenFormStateKey} from '../formstate/scenario_formstate';

import {AussieState} from './aussie_states';

// Form Types:
export type FormName = 'scenario' | 'characteristics';
export type VehicleType = 'bus' | 'ferry';
export type Agency = {
  agencyId: string;
  region: string;
  dateAccessed: string;
  id: string;
  state: AussieState;
  name: string;
  vehicleTypes: string[];
};

// Data types
export type AgencyData = {
  agency: string; // agencyId
  state: string; // Should be lowercase
  region: string;
  date: string;
  vehicleType: 'Bus' | 'Ferry';
};

// Info received from backend GTFS processing, that is required for Characteristics processing.
export type UpdatedGtfs = {
  agency: string;
  date: string;
  directory_path: string;
  model_name: string;
  region: string;
  results_path: string;
  state: string;
  vehicleType: string;
};

export type CharFormDataForBackend = {
  batterySize: string;
  socMin: string;
  socMax: string;
  energyConsumptionAvg: string;
  avgVehicleSpeed: string;
  chargeLocation: string;
  chargerType: string;
  depotChargeRate: string;
  chargeEfficiency: string;
  terminalChargerType: string;
  terminalChargeRate: string;
  terminalChargeEfficiency: string;
  vehicleEfficiency: string;
  minLayoverTime: string;
  chargeLogic: string;
  depotTravelTime: number; // Arbitrarily put in here as it seemed required for the back end
};

export type DataForBackend = {
  userInputsGTFS: UpdatedGtfs;
  userInputsConstants: CharFormDataForBackend;
};

export type DataForCharFormView = {
  gtfs: UpdatedGtfs;
  agencyName: string;
  selectedInput: string;
  vehicleType: VehicleType;
};

// ToolTip and Modal:
export type ToolTipType = {openModal: Function; info: JSX.Element | string};
export type BlurbInfo = {
  title: string;
  content: JSX.Element;
};

// Input Elements:
export type InputProps = {
  name: CharFormStateKey | ScenFormStateKey;
  tooltip?: JSX.Element;
  label?: string;
  defaultValue?: string;
  updateState: Function;
  blurb?: string;
};

export type NumberInputProps = InputProps & {
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  unitsOfMeasurement?: string;
};

export type InputOption = {
  value: string;
  label?: string;
};

export type InputOptions = {
  options: InputOption[];
};

export type RadioOption = InputOption & {onClick: Function};

export type RadioOptions = {
  options: RadioOption[];
};

// TypeGuards:

export function isVehicleType(value: string): value is VehicleType {
  return value === 'bus' || value === 'ferry';
}
