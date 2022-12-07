export type ChargingCharDefaults = {
  ac_options: number[];
  ac_default: number | undefined;
  dc_options: number[];
  dc_default: number | undefined;
  chargerToVehicle: number;
  gridToChargerDepot: number;
  gridToChargerOpp: number;
  terminalChargingWindow: number;
};

export type VehicleCharDefaults = {
  batteryCapacity_options: number[];
  batteryCapacity_default: number;
  socMin: number;
  socMax: number;
  avgVehicleEnergyConsumption_options: number[];
  avgVehicleEnergyConsumption_default: number;
  avgVehicleSpeed: number;
};

type VehicleDefault = VehicleCharDefaults & ChargingCharDefaults;

const BUS_CHARGINGCHAR_DEFAULTS: ChargingCharDefaults = {
  ac_options: [12, 20, 22, 25, 50, 60],
  ac_default: 60,
  dc_options: [80, 120, 160, 180, 240, 350, 600],
  dc_default: undefined,
  chargerToVehicle: 0.9,
  gridToChargerDepot: 0.9,
  gridToChargerOpp: 0.9,
  terminalChargingWindow: 2,
};

const BUS_VEHICLECHAR_DEFAULTS: VehicleCharDefaults = {
  batteryCapacity_options: [100, 150, 200, 250, 300, 350, 400],
  batteryCapacity_default: 300,
  socMin: 0.3,
  socMax: 0.9,
  avgVehicleEnergyConsumption_options: [0.8, 1.1, 1.5, 2.0, 3.5],
  avgVehicleEnergyConsumption_default: 1.1,
  avgVehicleSpeed: 50,
};

const BUS_ALL_DEFAULTS: VehicleDefault = {...BUS_CHARGINGCHAR_DEFAULTS, ...BUS_VEHICLECHAR_DEFAULTS};

const FERRY_CHARGINGCHAR_DEFAULTS: ChargingCharDefaults = {
  ac_options: [12, 20, 22, 25, 50, 60],
  ac_default: undefined,
  dc_options: [350, 500, 600, 800, 900, 2000, 3000, 4000, 5000, 6000],
  dc_default: 900,
  chargerToVehicle: 0.9,
  gridToChargerDepot: 0.9,
  gridToChargerOpp: 0.9,
  terminalChargingWindow: 5,
};

const FERRY_VEHICLECHAR_DEFAULTS: VehicleCharDefaults = {
  batteryCapacity_options: [500, 800, 1000, 2000, 4000],
  batteryCapacity_default: 1000,
  socMin: 0.3,
  socMax: 0.9,
  avgVehicleEnergyConsumption_options: [10, 25, 50],
  avgVehicleEnergyConsumption_default: 25,
  avgVehicleSpeed: 20,
};

const FERRY_ALL_DEFAULTS: VehicleDefault = {...FERRY_CHARGINGCHAR_DEFAULTS, ...FERRY_VEHICLECHAR_DEFAULTS};

export type VehicleDefaultKey = keyof typeof FERRY_ALL_DEFAULTS;

export function getAllVehicleDefaults(vehicleType: 'bus' | 'ferry') {
  return vehicleType === 'bus' ? BUS_ALL_DEFAULTS : FERRY_ALL_DEFAULTS;
}

export function getChargingCharDefaults(vehicleType: 'bus' | 'ferry') {
  return vehicleType === 'bus' ? BUS_CHARGINGCHAR_DEFAULTS : FERRY_CHARGINGCHAR_DEFAULTS;
}

export function getVehicleCharDefaults(vehicleType: 'bus' | 'ferry') {
  return vehicleType === 'bus' ? BUS_VEHICLECHAR_DEFAULTS : FERRY_VEHICLECHAR_DEFAULTS;
}
