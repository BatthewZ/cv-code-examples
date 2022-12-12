import {CharacteristicsFormState, isCharacteristicsFormKey} from '../formstate/characteristics_formstate';
import {capitalizeAllFirstLetters} from './stringFormatters';
import {CharFormDataForBackend, DataForBackend, UpdatedGtfs} from './types';

export function convertDataLabelsForBackend(
  gtfs: UpdatedGtfs,
  charFormState: CharacteristicsFormState
): DataForBackend | void {
  let chargingLogicStart: number | undefined = undefined;
  let chargingLogicEnd: number | undefined = undefined;
  if (charFormState.chargingLogic === 'sunshine' || charFormState.chargingLogic === 'nonpeak') {
    chargingLogicStart = +(charFormState.chargingLogicStart + '');
    chargingLogicEnd = +(charFormState.chargingLogicEnd + '');
  }
  console.log(`ChargingLogic: ${charFormState.chargingLogic}; Start:${chargingLogicStart} End: ${chargingLogicEnd}`);

  const convertedLabels: CharFormDataForBackend = {
    batterySize: charFormState.batteryCap ? +charFormState.batteryCap : 0,
    socMin: charFormState.socMin ? +charFormState.socMin : 0,
    socMax: charFormState.socMax ? +charFormState.socMax : 0,
    energyConsumptionAvg: charFormState.avgVehicleEnergyConsumption ? +charFormState.avgVehicleEnergyConsumption : 0,
    avgVehicleSpeed: charFormState.avgVehicleSpeed ? +charFormState.avgVehicleSpeed : 0,
    chargeLocation: capitalizeAllFirstLetters(charFormState.chargeLocation ?? ''),
    chargerType: charFormState.depotChargeType ?? '',
    depotChargeRate: charFormState.depotChargeRate ? +charFormState.depotChargeRate : 0,
    chargeEfficiency: charFormState.gridToChargerDepot ? +charFormState.gridToChargerDepot : 0,
    terminalChargerType: charFormState.oppChargeType ?? '',
    terminalChargeRate: charFormState.oppChargeRate ? +charFormState.oppChargeRate : 0,
    terminalChargeEfficiency: charFormState.gridToChargerOpp ? +charFormState.gridToChargerOpp : 0,
    vehicleEfficiency: charFormState.chargerToVehicle ? +charFormState.chargerToVehicle : 0,
    minLayoverTime: charFormState.terminalChargingWindow ? +charFormState.terminalChargingWindow : 0,
    chargeLogic: charFormState.chargingLogic ?? '',
    // -- User input values:
    sunshine_starts: charFormState.chargingLogic === 'sunshine' ? chargingLogicStart : 9,
    sunshine_ends: charFormState.chargingLogic === 'sunshine' ? chargingLogicEnd : 16,
    peak_starts: charFormState.chargingLogic === 'nonpeak' ? chargingLogicStart : 18,
    peak_ends: charFormState.chargingLogic === 'nonpeak' ? chargingLogicEnd : 20,
    depotTravelTime: 30, // Arbitrarily put in here as it seemed required for the back end
    num_min_periods: 60 * 24 * 8,
  };

  console.log('Sending information: \n\n', {
    userInputsGTFS: gtfs,
    userInputsConstants: convertedLabels,
  });

  return {
    userInputsGTFS: gtfs,
    userInputsConstants: convertedLabels,
  };
}
