import {useEffect, useState} from 'react';
import {updateStatement} from 'typescript';
import {InputOption, RadioOption} from '../../helper/types';
import {checkRadioButton, getSelectOptionsFromArray, unCheckRadioButtons} from '../../helper/uiHelpers';
import {ChargingCharDefaults} from '../../vehicleDefaults/vehicleDefaults';
import {NumberInput} from '../inputs/numberInput';
import {RadioButtons} from '../inputs/radioButtons';
import {SelectAndInput} from '../inputs/selectAndInput';
import {LoadingModal} from '../misc/loadingModal';
import {ToolTip} from '../misc/tooltip';
import {ChargingCharacteristicsBlurb} from '../tooltip-blurbs/char_chargingCharsBlurb';
import {ChargingLogicBlurb} from '../tooltip-blurbs/char_chargingLogicBlurb';
import {ChargeLogicHoursSelect} from './char_chargeLogicHours';

type CharTileProps = {
  updateFormState: Function;
  defaultValues: ChargingCharDefaults;
  showModal: Function;
};

export const ChargingCharacteristics: React.FC<CharTileProps> = ({
  updateFormState,
  showModal,
  defaultValues,
}: CharTileProps) => {
  const [depotOrTerms, setDepotOrTerms] = useState<'depot' | 'depotAndTerminals' | undefined>();
  const [oppChargeLabel, setOppChargeLabel] = useState<'Emergency' | 'Terminal' | undefined>();
  const [depotChargeType, setDepotChargeType] = useState<'ac' | 'dc' | undefined>();
  const [depotChargeOptions, setDepotChargeOptions] = useState<InputOption[]>();
  const [oppChargeType, setOppChargeType] = useState<'ac' | 'dc' | undefined>();
  const [oppChargeOptions, setOppChargeOptions] = useState<InputOption[]>();
  const [chargingLogicOptions, setChargingLogicOptions] = useState<RadioOption[]>();
  const [chargeLogic, setChargeLogic] = useState<'EOS' | 'ds' | 'sunshine' | 'nonpeak' | undefined>();
  const [chargeLogicHoursSelect, setChargeLogicHoursSelect] = useState(<></>);

  const selectOptions: {[index: string]: {ac: InputOption[]; dc: InputOption[]}} = {
    depotChargeRate: {
      ac: getSelectOptionsFromArray(defaultValues.ac_options),
      dc: getSelectOptionsFromArray(defaultValues.dc_options),
    },
    oppChargeRate: {
      ac: getSelectOptionsFromArray(defaultValues.ac_options),
      dc: getSelectOptionsFromArray(defaultValues.dc_options),
    },
  };

  const radioOptions = {
    location: [
      {
        value: 'depot',
        label: 'Depot',
        onClick: () => {
          setDepotOrTerms('depot');
          setOppChargeLabel('Emergency');
          updateFormState('chargeLocation', 'depot');
        },
      },
      {
        value: 'depotAndTerminals',
        label: 'Depot and Terminals',
        onClick: () => {
          setDepotOrTerms('depotAndTerminals');
          setOppChargeLabel('Terminal');
          updateFormState('chargeLocation', 'depotAndTerminals');
        },
      },
    ],
    depotChargeType: [
      {
        value: 'ac',
        label: 'AC',
        onClick: () => {
          setDepotChargeType('ac');
          updateFormState('depotChargeType', 'ac');
        },
      },
      {
        value: 'dc',
        label: 'DC',
        onClick: () => {
          setDepotChargeType('dc');
          updateFormState('depotChargeType', 'dc');
        },
      },
    ],
    oppChargeType: [
      // also used for 'Emergency Charge Type'
      {
        value: 'ac',
        label: 'AC',
        onClick: () => {
          setOppChargeType('ac');
          updateFormState('oppChargeType', 'ac');
        },
      },
      {
        value: 'dc',
        label: 'DC',
        onClick: () => {
          setOppChargeType('dc');
          updateFormState('oppChargeType', 'dc');
        },
      },
    ],
    depotChargingLogic: [
      {
        value: 'EOS',
        label: 'End of Service: Unconstrained',
        onClick: () => {
          setChargeLogic('EOS');
        },
      },
      {
        value: 'nonpeak',
        label: 'End of Service: Non-Peak',
        onClick: () => {
          setChargeLogic('nonpeak');
        },
      },
    ],
    terminalsChargingLogic: [
      {
        value: 'ds',
        label: 'During Service: Unconstrained',
        onClick: () => {
          setChargeLogic('ds');
        },
      },
      {
        value: 'sunshine',
        label: 'During Service: Sunshine Soak',
        onClick: () => {
          setChargeLogic('sunshine');
        },
      },
    ],
  };

  useEffect(() => {
    // reset ui state
    unCheckRadioButtons('depotChargeType');
    unCheckRadioButtons('oppChargeType');
    unCheckRadioButtons('chargingLogic');
    setDepotChargeType(undefined);
    setOppChargeType(undefined);
    setChargeLogic(undefined);

    // reset formstate
    updateFormState('depotChargeType', undefined);
    updateFormState('oppChargeType', undefined);
    updateFormState('depotChargeRate', undefined);
    updateFormState('oppChargeRate', undefined);
    updateFormState('chargingLogic', undefined);
    updateFormState('chargingLogicStart', undefined);
    updateFormState('chargingLogicEnd', undefined);

    if (depotOrTerms) {
      const chargeType = defaultValues.ac_default ? 'ac' : 'dc';
      const chargeRate = defaultValues.ac_default ? defaultValues.ac_default : defaultValues.dc_default;
      // Update Depot Charging UI and state
      setDepotChargeType(chargeType);
      checkRadioButton('depotChargeType', chargeType);
      updateFormState('depotChargeType', chargeType);
      updateFormState('depotChargeRate', chargeRate);

      // Update Opportunistic Charging UI and state
      setOppChargeType(chargeType);
      checkRadioButton('oppChargeType', chargeType);
      updateFormState('oppChargeType', chargeType);
      updateFormState('oppChargeRate', chargeRate);

      // Update Charge Logic options:
      const chargeLogic =
        depotOrTerms === 'depot' ? radioOptions.depotChargingLogic : radioOptions.terminalsChargingLogic;
      setChargingLogicOptions(chargeLogic);
    }
  }, [depotOrTerms]);

  useEffect(() => {
    if (depotChargeType) setDepotChargeOptions(selectOptions['depotChargeRate'][depotChargeType]);
  }, [depotChargeType]);

  useEffect(() => {
    if (depotChargeType) setDepotChargeOptions(selectOptions['depotChargeRate'][depotChargeType]);
  }, [depotChargeType]);

  useEffect(() => {
    if (oppChargeType) setOppChargeOptions(selectOptions['oppChargeRate'][oppChargeType]);
  }, [oppChargeType]);

  useEffect(() => {
    const showSelect = chargeLogic === 'nonpeak' || chargeLogic === 'sunshine';
    setChargeLogicHoursSelect(
      showSelect ? <ChargeLogicHoursSelect updateFormState={updateFormState} chargeLogic={chargeLogic} /> : <></>
    );
    if (!showSelect) {
      updateFormState('chargingLogicStart', undefined);
      updateFormState('chargingLogicEnd', undefined);
    }
  }, [chargeLogic]);

  // console.log('AC Default', defaultValues.ac_default);
  // console.log('DC Default', defaultValues.dc_default);
  // console.log('Depot Charge Type', depotChargeType);
  // console.log('Opp charge type', oppChargeType);

  return (
    <div>
      <div className='row center'>
        <div className='h1'>Charging Characteristics</div>
        <ToolTip
          onClick={() => {
            showModal(true, ChargingCharacteristicsBlurb);
          }}
        />
      </div>
      <p className='center'>
        Select the types of chargers, the desired locations that support charging, and the charging logic.{' '}
      </p>
      <RadioButtons
        name={'chargeLocation'}
        label={'Charging Location'}
        updateState={updateFormState}
        options={radioOptions.location}
        blurb={`This tool currently supports two options for charging locations: charging at a depot only and charging at
            both depots and transit terminals. Terminals refer to locations where vehicles either start or end their
            trips, and where the vehicle waits for longer than a minimum layover time.`}
      />

      {depotOrTerms ? (
        <p className='fadeInOnLoad'>
          Nominate the total efficiency of charging between the grid to the charging equipment, and between the charging
          equipment to the vehicle. Values should be between 0 and 1
        </p>
      ) : (
        ''
      )}

      {depotOrTerms ? (
        <fieldset>
          <legend>DEPOT</legend>
          {depotOrTerms ? (
            <RadioButtons
              name={'depotChargeType'}
              label={' '}
              updateState={updateFormState}
              options={radioOptions.depotChargeType}
            />
          ) : (
            ''
          )}
          {depotChargeType ? (
            <SelectAndInput
              name={'depotChargeRate'}
              label={'Depot Charge Rate'}
              updateState={updateFormState}
              options={depotChargeOptions ?? []}
              unitsOfMeasurement={'kW'}
              defaultValue={depotChargeType === 'ac' ? '' + defaultValues.ac_default : '' + defaultValues.dc_default}
              // defaultValue={'60'}
              // tooltip={<ToolTip onClick={() => {}} />}
            />
          ) : (
            ''
          )}
          <NumberInput
            name={'gridToChargerDepot'}
            label={'Charge Efficiency - Grid to Charger '}
            updateState={updateFormState}
            unitsOfMeasurement={'kW'}
            min={0.05}
            step={0.5}
            max={1}
            defaultValue={defaultValues.gridToChargerDepot + ''}
          />
          {/* <SelectAndInput
            name={'gridToChargerDepot'}
            label={'Depot Charge Efficiency -  Grid to Charger'}
            updateState={updateFormState}
            options={[]}
            unitsOfMeasurement={'??'}
          /> */}
        </fieldset>
      ) : (
        ''
      )}
      <p></p>
      {depotOrTerms ? (
        <fieldset>
          <legend>{oppChargeLabel?.toUpperCase()}</legend>
          {depotOrTerms ? (
            <RadioButtons
              name={'oppChargeType'}
              label={' '}
              updateState={updateFormState}
              options={radioOptions.oppChargeType}
            />
          ) : (
            ''
          )}
          {oppChargeType ? (
            <SelectAndInput
              name={'oppChargeRate'}
              label={oppChargeLabel + ' Charge Rate'}
              updateState={updateFormState}
              options={oppChargeOptions ?? []}
              unitsOfMeasurement={'kW'}
              // defaultValue={oppChargeType === 'ac' ? '' + defaultValues.ac_default : '' + defaultValues.dc_default}
              // defaultValue={'50'}
            />
          ) : (
            ''
          )}
          <NumberInput
            name={'gridToChargerOpp'}
            label={'Charge Efficiency - Grid to Charger '}
            updateState={updateFormState}
            unitsOfMeasurement={'kW'}
            min={0.05}
            step={0.5}
            max={1}
            defaultValue={defaultValues.gridToChargerOpp + ''}
          />
          {/* <SelectAndInput
            name={'gridToChargerOpp'}
            label={oppChargeLabel + ' Charge Efficiency -  Grid to Charger'}
            updateState={updateFormState}
            options={[]}
            unitsOfMeasurement={'??'}
          /> */}
        </fieldset>
      ) : (
        ''
      )}
      <NumberInput
        name={'chargerToVehicle'}
        label={'Charge to Vehicle '}
        updateState={updateFormState}
        unitsOfMeasurement={'kW'}
        min={0.05}
        step={0.5}
        max={1}
        defaultValue={defaultValues.chargerToVehicle + ''}
      />
      {/* <SelectAndInput
        label={'Charger to Vehicle'}
        name={'chargerToVehicle'}
        updateState={updateFormState}
        options={[]}
        unitsOfMeasurement={'??'}
      /> */}

      {depotOrTerms ? (
        <>
          <RadioButtons
            name={'chargingLogic'}
            label={'Charging Logic'}
            blurb={
              'Select the charging logic for all vehicles. This is dependent on the charging location type chosen (Depot, or Depot and Terminals). More information on each choice is available in the information button.'
            }
            tooltip={
              <ToolTip
                onClick={() => {
                  showModal(true, ChargingLogicBlurb);
                }}
              />
            }
            updateState={updateFormState}
            options={chargingLogicOptions ?? []}
          />
        </>
      ) : (
        ''
      )}
      {chargeLogicHoursSelect}
    </div>
  );
};
