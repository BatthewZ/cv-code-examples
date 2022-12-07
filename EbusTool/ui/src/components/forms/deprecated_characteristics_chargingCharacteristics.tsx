import {useState} from 'react';
import {CharacteristicsFormState, isCharacteristicsFormKey} from '../../formstate/characteristics_formstate';
import {InputOption} from '../../helper/types';
import {unCheckRadioButtons} from '../../helper/uiHelpers';
import {RadioButtons} from '../inputs/radioButtons';
import {Select} from '../inputs/select';
import {SelectAndInput} from '../inputs/selectAndInput';
import {ToolTip} from '../misc/tooltip';

type CharTileProps = {
  updateFormState: Function;
};

export const ChargingCharacteristics_Deprecated: React.FC<CharTileProps> = ({updateFormState}: CharTileProps) => {
  const [modal, setModal] = useState(<></>);
  //   const [chargeTypeAndRate, setChargeTypeAndRate] = useState(<></>);
  // const [location, setLocation] = useState<'depot' | 'depotAndTerminals' | undefined>()
  const [depotChargeType, setDepotChargeType] = useState(<></>);
  const [depotChargeRate, setDepotChargeRate] = useState(<></>);
  const [oppChargeLabel, setOppChargeLabel] = useState<'Opportunistic' | 'Emergency' | undefined>();
  const [oppChargeType, setOppChargeType] = useState(<></>);
  const [oppChargeRate, setOppChargeRate] = useState(<></>);

  const radioOptions = {
    location: [
      {
        value: 'depot',
        label: 'Depot',
        onClick: () => {
          setDepotChargeType(<></>);
          setOppChargeType(<></>);
          setChargeTypeButtons('depot');
          updateFormState('chargeLocation', 'depot');
        },
      },
      {
        value: 'depotAndTerminals',
        label: 'Depot and Terminals',
        onClick: () => {
          setDepotChargeType(<></>);
          setOppChargeType(<></>);
          setChargeTypeButtons('depotAndTerminals');
          updateFormState('chargeLocation', 'depotAndTerminals');
        },
      },
    ],
    depotChargeType: [
      {
        value: 'ac',
        label: 'AC',
        onClick: () => {
          setDepotChargeSelect('ac');
          updateFormState('depotChargeRate', 'ac');
        },
      },
      {
        value: 'dc',
        label: 'DC',
        onClick: () => {
          setDepotChargeSelect('dc');
          updateFormState('depotChargeRate', 'dc');
        },
      },
    ],
    oppChargeType: [
      // also used for 'Emergency Charge Type'
      {
        value: 'ac',
        label: 'AC',
        onClick: () => {
          setOppChargeSelect('ac');
          updateFormState('oppChargeRate', 'ac');
        },
      },
      {
        value: 'dc',
        label: 'DC',
        onClick: () => {
          setOppChargeSelect('dc');
          updateFormState('oppChargeRate', 'dc');
        },
      },
    ],
  };

  const selectOptions: {[index: string]: {ac: InputOption[]; dc: InputOption[]}} = {
    // Get these from VehicleData later on, based on the user's selected vehicle.
    depotChargeRate: {ac: [], dc: []},
    oppChargeRate: {ac: [], dc: []},
  };

  function setDepotChargeSelect(chargeType: 'ac' | 'dc') {
    const options = selectOptions['depotChargeRate'][chargeType];
    setDepotChargeRate(
      <SelectAndInput
        name={'depotChargeRate'}
        label={'Depot Charge Rate'}
        updateState={updateFormState}
        // options={options}
        options={testOptions()}
        unitsOfMeasurement={'kW'}
        // tooltip={<ToolTip onClick={() => {}} />}
      />
    );
  }

  function setOppChargeSelect(chargeType: 'ac' | 'dc') {
    const options = selectOptions['oppChargeRate'][chargeType];
    setOppChargeRate(
      <SelectAndInput
        name={'oppChargeRate'}
        label={oppChargeLabel + ' Charge Rate'}
        updateState={updateFormState}
        // options={options}
        options={testOptions()}
        unitsOfMeasurement={'kW'}
        // tooltip={<ToolTip onClick={() => {}} />}
      />
    );
  }

  function resetLocationForm() {
    unCheckRadioButtons('depotChargeType');
    unCheckRadioButtons('oppChargeType');
    updateFormState('depotChargeType', undefined);
    updateFormState('oppChargeType', undefined);
    setDepotChargeRate(<></>);
    setOppChargeRate(<></>);
  }

  function setChargeTypeButtons(depotOrTerms: 'depot' | 'depotAndTerminals') {
    const chargeLabel = depotOrTerms === 'depot' ? 'Emergency' : 'Opportunistic';
    setOppChargeLabel(() => chargeLabel);
    resetLocationForm();

    // Consider setting defaultvalues in here as well:
    setDepotChargeType(
      <RadioButtons
        name={'depotChargeType'}
        label={'Depot Charge Type'}
        updateState={updateFormState}
        options={radioOptions.depotChargeType}
      />
    );

    setOppChargeType(
      <RadioButtons
        name={'oppChargeType'}
        label={chargeLabel + ' Charge Type'}
        updateState={updateFormState}
        options={radioOptions.oppChargeType}
      />
    );
  }

  function testOptions() {
    return [
      {value: 'opt1', label: 'Placeholder 1'},
      {value: 'opt2', label: 'Placeholder 2'},
      {value: 'opt3', label: 'Placeholder 3'},
    ];
  }

  return (
    <div>
      <RadioButtons
        name={'chargeLocation'}
        label={'Location'}
        updateState={updateFormState}
        options={radioOptions.location}
      />
      {depotChargeType}
      {depotChargeRate}
      {oppChargeType}
      {oppChargeRate}
      <hr />
    </div>
  );
};
