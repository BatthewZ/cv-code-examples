import {getAllVehicleDefaults} from '../vehicleDefaults/vehicleDefaults';

export type CharacteristicsFormState = {
  chargeLocation: 'depot' | 'depotAndTerminals' | undefined;
  depotChargeRate: string | undefined;
  depotChargeType: 'ac' | 'dc' | undefined;
  oppChargeRate: string | undefined;
  oppChargeType: 'ac' | 'dc' | undefined;
  batteryCap: string | undefined;
  socMin: string | undefined;
  socMax: string | undefined;
  avgVehicleEnergyConsumption: string | undefined;
  avgVehicleSpeed: string | undefined;
  terminalChargingWindow: string | undefined;
  chargerToVehicle: string | undefined;
  gridToChargerDepot: string | undefined;
  gridToChargerOpp: string | undefined;
  chargingLogic: string | undefined;
  // depotTravelTime: string | undefined;
  // thisTest: string | undefined;
};

export function getNewCharacteristicsFormState(): CharacteristicsFormState {
  return {
    chargeLocation: undefined,
    depotChargeRate: undefined,
    depotChargeType: undefined,
    oppChargeRate: undefined,
    oppChargeType: undefined,
    batteryCap: undefined,
    socMin: '0.3',
    socMax: '0.9',
    avgVehicleEnergyConsumption: undefined,
    avgVehicleSpeed: undefined,
    terminalChargingWindow: undefined,
    chargerToVehicle: undefined,
    gridToChargerDepot: undefined,
    gridToChargerOpp: undefined,
    chargingLogic: undefined,
    // depotTravelTime: undefined,
    // thisTest: undefined,
  };
}

export function setDefaultValuesToFormState(vehicleType: 'bus' | 'ferry', formState: CharacteristicsFormState) {
  const vehicleDefaults = getAllVehicleDefaults(vehicleType);
  const chargeRate = vehicleType === 'bus' ? vehicleDefaults.ac_default : vehicleDefaults.dc_default;
  console.log(chargeRate);
  formState.depotChargeRate = '' + chargeRate;
  formState.oppChargeRate = '' + chargeRate;
  formState.chargerToVehicle = '' + vehicleDefaults.chargerToVehicle;
  formState.gridToChargerDepot = '' + vehicleDefaults.gridToChargerDepot;
  formState.gridToChargerOpp = '' + vehicleDefaults.gridToChargerOpp;
  formState.terminalChargingWindow = '' + vehicleDefaults.terminalChargingWindow;
  formState.batteryCap = '' + vehicleDefaults.batteryCapacity_default;
  formState.avgVehicleEnergyConsumption = '' + vehicleDefaults.avgVehicleEnergyConsumption_default;
  formState.avgVehicleSpeed = '' + vehicleDefaults.avgVehicleSpeed;
  formState.socMin = '' + vehicleDefaults.socMin;
  formState.socMax = '' + vehicleDefaults.socMax;

  console.log("Here's the udpated formState", formState);
  return formState;
}

export function isCharacteristicsFormKey(value: string): value is CharFormStateKey {
  return value in formStateForKey === true;
}

const formStateForKey = getNewCharacteristicsFormState();
export type CharFormStateKey = keyof typeof formStateForKey;
