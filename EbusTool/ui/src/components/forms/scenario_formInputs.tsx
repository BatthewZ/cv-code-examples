import {useEffect, useState} from 'react';
import {getSavedOrNewScenarioForm, isScenarioFormKey} from '../../formstate/scenario_formstate';
import {
  agencySelectOptions,
  agencyVehicleButtonOptions,
  getAgenciesByState,
  getAgencyBySelectValue,
} from '../../helper/agencyFormatters';
import {AussieState, AussieStateOptions} from '../../helper/aussie_states';
import {loadFromLocalStorage, saveToLocalStorage} from '../../helper/localStorageHelpers';
import {capitalizeFirstLetter} from '../../helper/stringFormatters';
import {Agency, AgencyData, DataForCharFormView, SavedScenFormInfo} from '../../helper/types';
import {clearError, setError} from '../../helper/uiHelpers';
import {emitMsg, GetSocket} from '../../websocket/websocket';
import {RadioButtons} from '../inputs/radioButtons';
import {Select} from '../inputs/select';
import {ToolTip} from '../misc/tooltip';
import {SelectAgencyBlurb} from '../tooltip-blurbs/scenario_agencyBlurb';

type ScenFormInputProps = {
  // updateFormState: Function;
  // onSubmit: Function;
  gtfsView: 'default' | 'import';
  onSuccess: (data: DataForCharFormView) => void;
  savedInfo?: SavedScenFormInfo;
  setModal: Function;
  agencies: Agency[];
};

export const ScenarioFormInputs: React.FC<ScenFormInputProps> = ({
  agencies,
  onSuccess,
  // savedInfo,
  setModal,
  gtfsView,
}: ScenFormInputProps) => {
  const [formState, setFormState] = useState(getSavedOrNewScenarioForm());
  // For dynamic UI generation:
  const [savedInfoHasLoaded, setSavedInfoHasLoaded] = useState(false);
  const [aussieState, setAussieState] = useState<AussieState | undefined>();
  const [selectedAgencyId, setSelectedAgencyId] = useState<string | undefined>();
  const [vehicleType, setVehicleType] = useState<string | undefined>();
  const [agencySelect, setAgencySelect] = useState<JSX.Element | undefined>();
  const [vehicleRadios, setVehicleRadios] = useState<JSX.Element | undefined>();
  const [confirmButton, setConfirmButton] = useState<JSX.Element | undefined>();

  function updateFormState(key: string, value: string | undefined) {
    if (!isScenarioFormKey(key)) {
      console.log(`"--- ERROR: ${key}" was not a valid form state key:`);
      console.log(Object.keys(formState));
      return;
    }

    setFormState((prevState) => {
      console.log(`Updating formstate> ${key} : ${value}`);

      const updatedState = {...prevState, [key]: value};
      // Save to local storage:
      const userSettings = loadFromLocalStorage();
      // console.log(userSettings);
      const settingsSaved = userSettings && userSettings.saved === true;
      if (settingsSaved) saveToLocalStorage(updatedState, 'scenario');
      return updatedState;
    });
  }

  useEffect(() => {
    updateFormState('gtfs', gtfsView);

    if (formState.state) {
      console.log('loading savedInfo:  State;');
      const agenciesByState = getAgenciesByState(agencies, formState.state);
      setAgencySelect(() => (
        <Select
          name={'agency'}
          label={'Select an Agency'}
          options={agencySelectOptions(agenciesByState)}
          updateState={selectAgencyOnChange}
          tooltip={
            <ToolTip
              onClick={() => {
                setModal(true, SelectAgencyBlurb);
              }}
            />
          }
          defaultValue={formState?.agency}
        />
      ));
    }
    if (formState.agency) {
      console.log('loading savedInfo:  agencyId;');
      setSelectedAgencyId(() => formState.agency);
      const selectedAgency = agencies.find((agency) => agency.id === formState.agency);

      if (selectedAgency) {
        setVehicleRadios(() => (
          <RadioButtons
            name={'vehicleType'}
            label={'Select a Vehicle Type'}
            options={agencyVehicleButtonOptions(selectedAgency)}
            updateState={radioButtonOnChange}
            defaultValue={formState.vehicleType}
          />
        ));
      }
    }
    if (formState.vehicleType) {
      setVehicleType(() => formState.vehicleType);
      showConfirmButton(agencies);
    }

    // This delay handles an issue with asyncronous state updates.
    // Without it, as the agency select appears, the vehicleType is
    // reset. If the vehicle type was set beforehand, the UI will
    // wrongfully reflect the pre-reset state with a checked radio.
    setTimeout(() => {
      setSavedInfoHasLoaded(() => true);
    }, 500);
  }, []);

  // Generate Agency options based on selected AussieState
  useEffect(() => {
    if (savedInfoHasLoaded) {
      // Clear previously selected formstate:
      updateFormState('agency', '');
      console.log('Clearing vehicleType: useEffect[aussieState]');
      updateFormState('vehicleType', '');

      // Clear previously selected component state:
      setSelectedAgencyId(undefined);
      setVehicleType(undefined);

      // Reset UI elements:
      setAgencySelect(undefined);
      setVehicleRadios(undefined);
      setConfirmButton(undefined);

      //   setSavedInfoHasLoaded(false);
    }

    if (!aussieState) return;

    const agenciesByState = getAgenciesByState(agencies, aussieState);
    setAgencySelect(
      <Select
        name={'agency'}
        label={'Select an Agency'}
        options={agencySelectOptions(agenciesByState)}
        updateState={selectAgencyOnChange}
        tooltip={
          <ToolTip
            onClick={() => {
              setModal(true, SelectAgencyBlurb);
            }}
          />
        }
        defaultValue={formState?.agency}
      />
    );
  }, [aussieState]);

  // Generate VehicleType radio buttons based on selected Agency
  useEffect(() => {
    if (savedInfoHasLoaded) {
      // Reset previously selected formstate:
      console.log('Clearing vehicleType: useEffect[selectedAgencyId]');
      updateFormState('vehicleType', '');

      // Reset previously selected component state:
      setVehicleType(undefined);

      // Reset UI elements:
      setVehicleRadios(undefined);
      setConfirmButton(undefined);

      //   setSavedInfoHasLoaded(false);
    }

    if (!selectedAgencyId) {
      return;
    }

    const selectedAgency = agencies.find((agency) => agency.id === selectedAgencyId);

    if (selectedAgency) {
      setVehicleRadios(
        <RadioButtons
          name={'vehicleType'}
          label={'Select a Vehicle Type'}
          options={agencyVehicleButtonOptions(selectedAgency)}
          updateState={radioButtonOnChange}
          defaultValue={formState?.vehicleType}
        />
      );
    }
  }, [selectedAgencyId]);

  // Generate Confirm Scenario button once Vehicle Types have been selected
  useEffect(() => {
    if (!vehicleType) {
      setConfirmButton(undefined);
      return;
    }
    showConfirmButton(agencies);
  }, [vehicleType]);

  // Scroll to the bottom to see any new elements that appear.
  useEffect(() => {
    const elements = document.querySelectorAll(`[id*='-InputContainer']`);
    if (elements && elements.length) elements[elements.length - 1].scrollIntoView();
  }, [agencySelect, vehicleRadios, confirmButton]);

  function radioButtonOnChange(key: string, value: string | undefined) {
    setVehicleType(value);
    updateFormState(key, value);
  }

  function selectAgencyOnChange(key: string, value: string | undefined) {
    setVehicleRadios(undefined);
    setSelectedAgencyId(value);
    updateFormState(key, value);
  }

  function selectStateOnChange(key: string, value: AussieState | undefined) {
    setAussieState(value);
    updateFormState(key, value);
  }

  function clearErrors() {
    for (const formstateKey of Object.keys(formState)) {
      if (isScenarioFormKey(formstateKey)) clearError(formstateKey);
    }
  }

  function formIsValid() {
    clearErrors();
    let isValid = true;

    if (formState.gtfs !== 'default' && formState.gtfs !== 'import') {
      setError('gtfs', 'You must select the GTFS input!');
      isValid = false;
    }

    if (formState.gtfs === 'default') {
      if (!formState.state) {
        setError('state', 'You must select a state!');
        isValid = false;
      }

      if (!formState.agency) {
        setError('agency', 'You must select an agency!');
        isValid = false;
      }

      if (!formState.vehicleType) {
        setError('vehicleType', 'You must select a Vehicle Type!');
        isValid = false;
      }
    } else if (formState.gtfs === 'import') {
      if (!formState.importPath || !formState.importPath.length) {
        setError('importPath', 'You must set an import path!');
        isValid = false;
      }
    }
    return isValid;
  }

  function onSubmit(agencies: Agency[]) {
    if (!formIsValid()) return;

    // get agency by id.
    const selectedAgency = getAgencyBySelectValue(agencies, formState.agency);

    // console.log('Selected Agency:', selectedAgency);

    if (!selectedAgency || formState.vehicleType === undefined || formState.state === undefined) {
      console.log('formstate.vehicleType:', formState.vehicleType);
      console.log('formstate.state:', formState.state);
      console.log('Could not find agency. Something went wrong. Cancelling submit.');
      return;
    }
    const agencyData: AgencyData = {
      agency: selectedAgency.agencyId,
      state: formState.state.toLowerCase(),
      region: selectedAgency.region,
      date: selectedAgency.dateAccessed,
      vehicleType: capitalizeFirstLetter(formState.vehicleType) as 'Bus' | 'Ferry',
    };

    emitMsg('gtfs', agencyData);
  }

  GetSocket().on('updatedGtfs', (updatedGtfsInfo) => {
    console.log('Updated GTFS data is: ', updatedGtfsInfo);
    const data: DataForCharFormView = {
      gtfs: updatedGtfsInfo.gtfs,
      agencyName: getAgencyBySelectValue(agencies, formState.agency)?.name ?? '',
      selectedInput: formState.gtfs ?? '',
      vehicleType: formState.vehicleType ?? 'bus',
    };
    onSuccess(data);
  });

  function showConfirmButton(agencies: Agency[]) {
    setConfirmButton(
      <div className='row centerChildren fadeInOnLoad'>
        <button className='btn bg-pink' onMouseUp={() => onSubmit(agencies)}>
          Confirm Scenario
        </button>
      </div>
    );
  }

  return (
    <div className='fadeInOnLoad' id='scenarioDefaultView'>
      {/* <button onClick={() => console.log(formState)}>Check Formstate</button> */}
      <Select
        name={'state'}
        label='Select a State'
        options={AussieStateOptions()}
        updateState={selectStateOnChange}
        defaultValue={formState?.state}
      />
      {agencySelect}
      {vehicleRadios}
      {confirmButton}
      <div></div>
    </div>
  );
};
