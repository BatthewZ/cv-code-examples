import {NumberInput} from '../inputs/numberInput';

type CharTileProps = {
  updateFormState: Function;
};

// This tile will become deprecated
export const ChargeEfficiency: React.FC<CharTileProps> = ({updateFormState}: CharTileProps) => {
  return (
    <div>
      <h1>Charging Efficiency</h1>
      <NumberInput label={'Charger to Vehicle'} name={'chargerToVehicle'} updateState={updateFormState} />
      {/* <NumberInput label={'Grid to Charger: Depot'} name={'gridToChargerDepot'} updateState={updateFormState} /> */}
      {/* This one might need to be called 'Grid to Charger: Opportunistic or Emergency */}
      {/* Consider getting oppChargeLabel state in char_form, and passing a function to change it into ChargingCharacteristics.
        That way the label can change depending on if the user selects 'depot' or 'depotAndTerminals' from the radio button.
      */}
      {/* <NumberInput label={'Grid to Charger: Emergency'} name={'gridToChargerEmergency'} updateState={updateFormState} /> */}
    </div>
  );
};
