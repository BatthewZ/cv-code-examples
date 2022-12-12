import {useEffect, useState} from 'react';
import {
  getNewCharacteristicsFormState,
  isCharacteristicsFormKey,
  setDefaultValuesToFormState,
} from '../../formstate/characteristics_formstate';
import {convertDataLabelsForBackend} from '../../helper/convertToDataForBackend';
import {UpdatedGtfs} from '../../helper/types';
import {clearError, getSelectOptionsFromArray, scrollToView, setError} from '../../helper/uiHelpers';
import {getChargingCharDefaults, getVehicleCharDefaults} from '../../vehicleDefaults/vehicleDefaults';
import {emitMsg, GetSocket} from '../../websocket/websocket';
import {SelectAndInput} from '../inputs/selectAndInput';
import {LoadingModal} from '../misc/loadingModal';
import {ToolTip} from '../misc/tooltip';
import {MinLayoverTimeBlurb} from '../tooltip-blurbs/char_minLayoverTimeBlurb';
import {ChargingCharacteristics} from './char_ChargingChars';
import {VehicleCharacteristics} from './char_vehicleChars';

type CharProps = {
  onSuccess: Function;
  goBack: Function;
  selectedGTFS: UpdatedGtfs;
  vehicleType: 'bus' | 'ferry';
  viewRecentResults?: boolean;
};

for (const key of Object.keys(getNewCharacteristicsFormState())) {
  console.log(key);
}

export const CharacteristicsForm: React.FC<CharProps> = ({
  onSuccess,
  goBack,
  vehicleType,
  selectedGTFS,
  viewRecentResults = false,
}: CharProps) => {
  const [modal, setModal] = useState(<></>);
  const [formState, setFormState] = useState(getNewCharacteristicsFormState());
  const [viewAdvancedFeatures, setViewAdvancedFeatures] = useState(false);
  const [viewOrHide, setViewOrHide] = useState<'View' | 'Hide'>('View');

  // Set default values to formState:
  useEffect(() => {
    if (vehicleType) {
      const newFormState = setDefaultValuesToFormState(vehicleType, formState);
      setFormState(newFormState);
    }
  }, []);

  useEffect(() => {
    setViewOrHide(viewAdvancedFeatures ? 'Hide' : 'View');
  }, [viewAdvancedFeatures]);

  function updateFormState(key: string, value: string | undefined) {
    if (!isCharacteristicsFormKey(key)) {
      console.log(`"--- ERROR: ${key}" was not a valid form state key:`);
      console.log(Object.keys(formState));
      return;
    }

    setFormState((prevState) => {
      // console.log(`Updating formstate> ${key} : ${value}`);

      // // Save to local storage:
      // const userSettings = loadFromLocalStorage();
      // const settingsSaved = userSettings && userSettings.saved === true;
      // if (settingsSaved) saveToLocalStorage(updatedState, 'scenario');

      const updatedState = {...prevState, [key]: value};
      return updatedState;
    });
  }

  function showModal(modalIsOpen: boolean, blurb?: JSX.Element) {
    setModal(
      modalIsOpen ? (
        <LoadingModal content={blurb ?? <></>} isActive={true} closeButton={() => setModal(<></>)} />
      ) : (
        <></>
      )
    );
  }

  function getTerminalWindowOptions() {
    const times = [];
    for (let i = 0; i < 60; i++) {
      times.push(i);
    }
    return getSelectOptionsFromArray(times);
  }

  function clearErrors() {
    for (const formstateKey of Object.keys(formState)) {
      if (isCharacteristicsFormKey(formstateKey)) clearError(formstateKey);
    }
    clearError('socRange');
  }

  // Add validation for chargeLogic start/end

  function formIsValid() {
    let isValid = true;
    let scrollToViewId = '';

    // The order of validation matters for the UX with the current system.
    // The order of validation should match the order of the inputs on screen from top to bottom.

    // Vehicle Characteristics:

    if (!formState.batteryCap) {
      setError('batteryCap', 'You must set a valid number for battery capacity!');
      isValid = false;

      scrollToViewId = scrollToViewId ? scrollToViewId : '#batteryCapacity-InputContainer';
    } else {
      const batteryCapacity = +formState.batteryCap;
      const minCapacity = vehicleType === 'bus' ? 50 : 100;
      if (batteryCapacity < minCapacity) {
        setError('batteryCap', `You must set a valid number for battery capacity (must be ${minCapacity} or higher!`);
        isValid = false;

        scrollToViewId = scrollToViewId ? scrollToViewId : '#batteryCapacity-InputContainer';
      }
    }

    if (formState.socMin && formState.socMax) {
      const min = +formState.socMin;
      const max = +formState.socMax;

      // Should the min socrange ever be allowed to be 0?
      if (min > max || min < 0.05 || max > 1) {
        setError('socRange', 'You must set a valid SOC range. The range must be between 0.05 - 1!');
        isValid = false;

        scrollToViewId = scrollToViewId ? scrollToViewId : '#socRange-InputContainer';
      }
    } else {
      setError('socRange', 'You must set a valid SOC range!');
      isValid = false;

      scrollToViewId = scrollToViewId ? scrollToViewId : '#socRange-InputContainer';
    }

    if (!formState.avgVehicleEnergyConsumption) {
      setError('avgVehicleEnergyConsumption', 'You must set a valid number for vehicle energy consumption average!');
      isValid = false;

      scrollToViewId = scrollToViewId ? scrollToViewId : '#energyConsumptionAvg-InputContainer';
    } else {
      const energyConsumptionAvg = +formState.avgVehicleEnergyConsumption;
      const minConsumption = vehicleType === 'bus' ? 0.2 : 1;
      if (energyConsumptionAvg < minConsumption) {
        setError(
          'avgVehicleEnergyConsumption',
          `You must set a valid number for vehicle energy consumption average (must be ${minConsumption} or higher!!`
        );
        isValid = false;

        scrollToViewId = scrollToViewId ? scrollToViewId : '#energyConsumptionAvg-InputContainer';
      }
    }

    if (!formState.avgVehicleSpeed) {
      // Set default speed
      setError('avgVehicleSpeed', 'You must set a valid number for the minimum layover time!');
      isValid = false;
      scrollToViewId = scrollToViewId ? scrollToViewId : '#avgVehicleSpeed-InputContainer';
    } else {
      const avgVehicleSpeed = +formState.avgVehicleSpeed;
      const minSpeed = vehicleType === 'bus' ? 10 : 5;
      if (avgVehicleSpeed < minSpeed || avgVehicleSpeed > 100) {
        setError(
          'avgVehicleSpeed',
          `You must set a valid number between ${minSpeed} = 100 for the Terminal Charging Window!`
        );
        isValid = false;
        scrollToViewId = scrollToViewId ? scrollToViewId : '#avgVehicleSpeed-InputContainer';
      }
    }

    // Charging Characteristics:

    if (formState.chargeLocation !== 'depot' && formState.chargeLocation !== 'depotAndTerminals') {
      setError('chargeLocation', 'You must select a charge location!');
      isValid = false;

      scrollToViewId = scrollToViewId ? scrollToViewId : '#chargeLocation-InputContainer';
    }

    if (!formState.depotChargeType) {
      setError('depotChargeType', 'You must select a depot charge type!');
      isValid = false;

      scrollToViewId = scrollToViewId ? scrollToViewId : '#depotChargeType-InputContainer';
    }

    if (!formState.depotChargeRate) {
      setError('depotChargeRate', 'You must set a valid number for depot charge rate!');
      isValid = false;

      scrollToViewId = scrollToViewId ? scrollToViewId : '#depotChargeRate-InputContainer';
    } else {
      const depotChargeRate = +formState.depotChargeRate;
      if (depotChargeRate < 5) {
        setError('depotChargeRate', 'Depot charge rate must be a number with a value of 5 or higher!');
        isValid = false;

        scrollToViewId = scrollToViewId ? scrollToViewId : '#depotChargeRate-InputContainer';
      }
    }

    if (!formState.gridToChargerDepot) {
      setError('gridToChargerDepot', 'You must set a valid number for Grid to Charger: Depot!');
      isValid = false;

      scrollToViewId = scrollToViewId ? scrollToViewId : '#gridToChargerDepot-InputContainer';
    } else {
      const gridToChargerDepot = +formState.gridToChargerDepot;
      if (gridToChargerDepot < 0.1 || gridToChargerDepot > 1) {
        setError('gridToChargerDepot', 'You must set a valid number between 0.1 - 1 for Grid to Charger: Depot!');
        isValid = false;

        scrollToViewId = scrollToViewId ? scrollToViewId : '#gridToChargerDepot-InputContainer';
      }
    }

    if (!formState.oppChargeType) {
      setError('oppChargeType', 'You must set a valid number for opportunity/emergency charge type!');
      isValid = false;

      scrollToViewId = scrollToViewId ? scrollToViewId : '#oppChargeType-InputContainer';
    }

    if (!formState.oppChargeRate) {
      setError('oppChargeRate', 'You must set a valid number for  opportunity/emergency charge rate!');
      isValid = false;

      scrollToViewId = scrollToViewId ? scrollToViewId : '#oppChargeRate-InputContainer';
    } else {
      const oppChargeRate = +formState.oppChargeRate;
      if (oppChargeRate < 6) {
        setError('oppChargeRate', 'Opportunity/emergency charge rate must be a valid number of 6 or higher!');
        isValid = false;

        scrollToViewId = scrollToViewId ? scrollToViewId : '#oppChargeRate-InputContainer';
      }
    }

    if (!formState.gridToChargerOpp) {
      setError('gridToChargerOpp', 'You must set a valid number for Grid to Charger: Emergency!');
      isValid = false;

      scrollToViewId = scrollToViewId ? scrollToViewId : '#gridToChargerEmergency-InputContainer';
    } else {
      const gridToChargerOpp = +formState.gridToChargerOpp;
      if (gridToChargerOpp < 0.1 || gridToChargerOpp > 1) {
        setError('gridToChargerOpp', 'You must set a valid number between 0.1 - 1 for Grid to Charger: Emergency!');
        isValid = false;

        scrollToViewId = scrollToViewId ? scrollToViewId : '#gridToChargerOpp-InputContainer';
      }
    }

    if (!formState.chargerToVehicle) {
      setError('chargerToVehicle', 'You must set a valid number for charger to the vehicle!');
      isValid = false;

      scrollToViewId = scrollToViewId ? scrollToViewId : '#chargerToVehicle-InputContainer';
    } else {
      const chargerToVehicle = +formState.chargerToVehicle;
      if (chargerToVehicle < 0.1 || chargerToVehicle > 1) {
        setError('chargerToVehicle', 'You must set a valid number between 0.1 - 1 for charger to the vehicle!');
        isValid = false;

        scrollToViewId = scrollToViewId ? scrollToViewId : '#chargerToVehicle-InputContainer';
      }
    }

    if (!formState.chargingLogic) {
      setError('chargingLogic', 'You must select a Charging Logic option!');
      isValid = false;
      scrollToViewId = scrollToViewId ? scrollToViewId : '#chargingLogic-InputContainer';
    }

    if (!formState.terminalChargingWindow) {
      setError('terminalChargingWindow', 'You must set a valid number for the minimum layover time!');
      isValid = false;
      scrollToViewId = scrollToViewId ? scrollToViewId : '#terminalChargingWindow-InputContainer';
    } else {
      const terminalChargingWindow = +formState.terminalChargingWindow;
      if (terminalChargingWindow < 1) {
        setError(
          'terminalChargingWindow',
          'You must set a valid number (greater than 1) for the Terminal Charging Window!'
        );
        isValid = false;
        scrollToViewId = scrollToViewId ? scrollToViewId : '#terminalChargingWindow-InputContainer';
      }
    }

    if (!formState.chargingLogic) {
      setError('chargingLogic', 'You must select a charging logic!');
      isValid = false;
      scrollToViewId = scrollToViewId ? scrollToViewId : '#terminalChargingWindow-InputContainer';
    }

    if (scrollToViewId) scrollToView(scrollToViewId);

    // console.log(isValid);
    return isValid;
  }

  function onSubmit() {
    clearErrors();
    if (!formIsValid()) return;

    emitMsg('characteristics', convertDataLabelsForBackend(selectedGTFS, formState));
  }

  GetSocket().on('graphData', (graphData) => {
    console.log(graphData);
    // onSuccess(data);
  });

  return (
    <div>
      {modal}
      <VehicleCharacteristics
        updateFormState={updateFormState}
        showModal={showModal}
        defaultValues={getVehicleCharDefaults(vehicleType)}
      />
      <hr />
      <ChargingCharacteristics
        updateFormState={updateFormState}
        showModal={showModal}
        defaultValues={getChargingCharDefaults(vehicleType)}
      />
      <hr />
      <p
        className='clickableText center'
        onClick={() => {
          setViewAdvancedFeatures(() => !viewAdvancedFeatures);
        }}
      >
        {viewOrHide} Advanced Features
      </p>

      {viewAdvancedFeatures ? (
        <>
          <SelectAndInput
            name={'terminalChargingWindow'}
            label='Terminal Charging Window'
            updateState={updateFormState}
            options={getTerminalWindowOptions()}
            defaultValue={getChargingCharDefaults(vehicleType).terminalChargingWindow + ''}
            unitsOfMeasurement='minutes'
            blurb='Nominate the minimum amount of time the vehicle spends at a terminal before it has the opportunity to top-up charge.'
            tooltip={<ToolTip onClick={() => showModal(true, MinLayoverTimeBlurb)} />}
          />
        </>
      ) : (
        <></>
      )}
      <hr />
      <div className='column centerChildren'>
        <button className='btn bg-pink' onClick={onSubmit}>
          Confirm Characteristics
        </button>
        <button className='btn bg-greyBlue1' onClick={() => goBack()}>
          Go Back
        </button>
        {/* <button onClick={() => console.log(formState)}>Print CharFormState</button> */}
      </div>
    </div>
  );
};
