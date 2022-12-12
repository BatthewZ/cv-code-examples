import {AussieState} from './aussie_states';
import {capitalizeFirstLetter} from './stringFormatters';
import {Agency} from './types';

export function agencySelectOptions(agencies: Agency[]) {
  return agencies.map((agency) => {
    return {value: agency.id, label: agency.name};
  });
}

export function getAgenciesByState(agencies: Agency[], state: AussieState) {
  const agenciesByState = agencies.filter((agency) => agency.state === state);
  return agenciesByState.sort((a, b) => (a.name > b.name ? 1 : -1));
}

export function getAgencyBySelectValue(agencies: Agency[], selectValue: string | undefined) {
  if (!selectValue) return;
  return agencies.find((agency) => agency.id === selectValue);
}

export function agencyVehicleButtonOptions(agency: Agency) {
  return agency.vehicleTypes.map((vehType) => {
    return {value: vehType.toLowerCase(), label: capitalizeFirstLetter(vehType), onClick: () => {}};
  });
}
