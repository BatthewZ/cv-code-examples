import {useEffect, useState} from 'react';
import {getSelectOptionsFromArray} from '../../helper/uiHelpers';
import {VehicleCharDefaults} from '../../vehicleDefaults/vehicleDefaults';
import {SelectAndInput} from '../inputs/selectAndInput';
import {SOCRange} from '../inputs/SOCrange';
import {ToolTip} from '../misc/tooltip';
import {AvgVehicleSpeedBlurb} from '../tooltip-blurbs/char_avgVehicleSpeed';
import {SOCRangeBlurb} from '../tooltip-blurbs/char_socRangeBlurb';

type CharTileProps = {
  updateFormState: Function;
  defaultValues: VehicleCharDefaults;
  showModal: Function;
};

export const VehicleCharacteristics: React.FC<CharTileProps> = ({
  updateFormState,
  showModal,
  defaultValues,
}: CharTileProps) => {
  const batterySizeOptions = [
    {
      value: '0',
      label: 'Value 1',
    },
    {
      value: '1',
      label: 'Value 1',
    },
    {
      value: '2',
      label: 'Value 3',
    },
  ];

  function getAvgSpeedOptions() {
    const speeds = [];
    for (let i = 5; i < 105; i += 5) {
      speeds.push(i);
    }
    return getSelectOptionsFromArray(speeds);
  }

  return (
    <div>
      <h1>Vehicle Characteristics</h1>
      <SelectAndInput
        name={'batteryCap'}
        label={'On-Board Vehicle Battery Capacity'}
        updateState={updateFormState}
        options={getSelectOptionsFromArray(defaultValues.batteryCapacity_options)}
        defaultValue={'' + defaultValues.batteryCapacity_default}
        unitsOfMeasurement='kWh'
      />

      <SOCRange
        updateState={updateFormState}
        defaultMin={defaultValues.socMin}
        defaultMax={defaultValues.socMax}
        tooltip={
          <ToolTip
            onClick={() => {
              showModal(true, SOCRangeBlurb);
            }}
          />
        }
      />

      <SelectAndInput
        name={'avgVehicleEnergyConsumption'}
        label='Average Vehicle Energy Consumption'
        updateState={updateFormState}
        blurb='This is the average energy consumption that the vehicle uses per km. If air-conditioning systems are needed, please include them here. 
        '
        options={getSelectOptionsFromArray(defaultValues.avgVehicleEnergyConsumption_options)}
        defaultValue={'' + defaultValues.avgVehicleEnergyConsumption_default}
        unitsOfMeasurement='kWh/km'
      />
      <SelectAndInput
        name={'avgVehicleSpeed'}
        label='Average Vehicle Speed'
        updateState={updateFormState}
        options={getAvgSpeedOptions()}
        defaultValue={'' + defaultValues.avgVehicleSpeed}
        unitsOfMeasurement='km/hr'
        blurb='Select the average speed of the vehicle in normal traffic conditions.'
        tooltip={<ToolTip onClick={() => showModal(true, AvgVehicleSpeedBlurb)} />}
      />
    </div>
  );
};
