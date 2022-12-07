import {CharacteristicsFormState, isCharacteristicsFormKey} from '../formstate/characteristics_formstate';
import {capitalizeAllFirstLetters} from './stringFormatters';
import {CharFormDataForBackend, DataForBackend, UpdatedGtfs} from './types';

export function convertDataLabelsForBackend(
  gtfs: UpdatedGtfs,
  charFormState: CharacteristicsFormState
): DataForBackend | void {
  // Check to make sure charFormState has values:

  for (const key of Object.keys(charFormState)) {
    if (isCharacteristicsFormKey(key)) {
      if (!charFormState[key]) return;
    }
  }

  const convertedLabels: CharFormDataForBackend = {
    batterySize: charFormState.batteryCap ?? '',
    socMin: charFormState.socMin ?? '',
    socMax: charFormState.socMax ?? '',
    energyConsumptionAvg: charFormState.avgVehicleEnergyConsumption ?? '',
    avgVehicleSpeed: charFormState.avgVehicleSpeed ?? '',
    chargeLocation: capitalizeAllFirstLetters(charFormState.chargeLocation ?? ''),
    chargerType: charFormState.depotChargeType ?? '',
    depotChargeRate: charFormState.depotChargeRate ?? '',
    chargeEfficiency: charFormState.gridToChargerDepot ?? '',
    terminalChargerType: charFormState.oppChargeType ?? '',
    terminalChargeRate: charFormState.oppChargeRate ?? '',
    terminalChargeEfficiency: charFormState.gridToChargerOpp ?? '',
    vehicleEfficiency: charFormState.chargerToVehicle ?? '',
    minLayoverTime: charFormState.terminalChargingWindow ?? '',
    chargeLogic: charFormState.chargingLogic ?? '',
    depotTravelTime: 30, // Arbitrarily put in here as it seemed required for the back end
  };

  return {
    userInputsGTFS: gtfs,
    userInputsConstants: convertedLabels,
  };
}
