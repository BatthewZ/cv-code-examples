import {useEffect, useState} from 'react';
import {Select} from '../inputs/select';
import {AussieState, AussieStateOptions, isAussieState} from '../../helper/aussie_states';
import {Agency, VehicleType} from '../../helper/types';
import {agencySelectOptions, agencyVehicleButtonOptions, getAgenciesByState} from '../../helper/agencyFormatters';
import {RadioButtons} from '../inputs/radioButtons';
import {ScenarioFormState} from '../../formstate/scenario_formstate';
import {Link} from '../misc/link';
import {SelectAgencyBlurb} from '../tooltip-blurbs/scenario_agencyBlurb';
import {ToolTip} from '../misc/tooltip';

type SavedInfo = {
  state?: AussieState;
  agencyId?: string;
  vehicleType?: VehicleType;
};

type FormProps = {
  updateState: Function;
  agencies: Agency[];
  savedSettings?: ScenarioFormState;
  setModal: Function;
  onSubmit: Function;
  savedInfo?: SavedInfo;
};

// type loadStatus = 'loading' | 'done';

export const ScenarioDefaultView: React.FC<FormProps> = ({
  updateState,
  agencies,
  setModal,
  onSubmit,
  savedInfo,
}: FormProps) => {
  // to track that all user settings are loaded, to prevent other useEffects asynchronously overwriting formData before they should:
  // const [loadingStatus, setLoadingStatus] = useState({
  //   state: savedInfo? 'loading' : 'done',
  //   agencyId: savedInfo? 'loading' : 'done',
  //   vehicleType: savedInfo? 'loading' : 'done'
  // })

  // For dynamic UI generation:
  const [savedInfoHasLoaded, setSavedInfoHasLoaded] = useState(false);
  const [aussieState, setAussieState] = useState<AussieState | undefined>();
  const [selectedAgencyId, setSelectedAgencyId] = useState<string | undefined>();
  const [vehicleType, setVehicleType] = useState<string | undefined>();
  const [agencySelect, setAgencySelect] = useState<JSX.Element | undefined>();
  const [vehicleRadios, setVehicleRadios] = useState<JSX.Element | undefined>();
  const [confirmButton, setConfirmButton] = useState<JSX.Element | undefined>();

  // useEffect(() => {
  //   if (loadingStatus.agencyId === 'done' && loadingStatus.state === 'done' && loadingStatus.vehicleType === 'done') {
  //     console.log('setting savedInfo loaded to true...');
  //     setSavedInfoHasLoaded(true);
  //   }
  // }, [loadingStatus]);

  // Load user settings.
  useEffect(() => {
    // function updateLoadingStatus(setting : 'state' | 'agencyId' | 'vehicleType'){
    //   setLoadingStatus((prev) => {
    //     const updated = {...prev};
    //     updated[setting] = 'done'
    //     return updated})
    // }

    if (savedInfo) {
      if (savedInfo.state) {
        console.log('loading savedInfo:  State;');
        const agenciesByState = getAgenciesByState(agencies, savedInfo.state);
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
            defaultValue={savedInfo?.agencyId}
          />
        );
      } else {
      }
      if (savedInfo.agencyId) {
        console.log('loading savedInfo:  agencyId;');
        setSelectedAgencyId(savedInfo.agencyId);
        const selectedAgency = agencies.find((agency) => agency.id === savedInfo.agencyId);

        if (selectedAgency) {
          setVehicleRadios(
            <RadioButtons
              name={'vehicleType'}
              label={'Select a Vehicle Type'}
              options={agencyVehicleButtonOptions(selectedAgency)}
              updateState={radioButtonOnChange}
              defaultValue={savedInfo?.vehicleType}
            />
          );
        }
      } else {
      }

      if (savedInfo.vehicleType) {
        setVehicleType(savedInfo.vehicleType);
        showConfirmButton();
      } else {
      }
    }
  }, []);

  // Generate Agency options based on selected AussieState
  useEffect(() => {
    if (savedInfoHasLoaded) {
      // Clear previously selected formstate:
      updateState('agency', '');
      console.log('Clearing vehicleType: useEffect[aussieState]');
      updateState('vehicleType', '');

      // Clear previously selected component state:
      setSelectedAgencyId(undefined);
      setVehicleType(undefined);

      // Reset UI elements:
      setAgencySelect(undefined);
      setVehicleRadios(undefined);
      setConfirmButton(undefined);
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
        defaultValue={savedInfo?.agencyId}
      />
    );
  }, [aussieState]);

  // Generate VehicleType radio buttons based on selected Agency
  useEffect(() => {
    if (savedInfoHasLoaded) {
      // Reset previously selected formstate:
      console.log('Clearing vehicleType: useEffect[selectedAgencyId]');
      updateState('vehicleType', '');

      // Reset previously selected component state:
      setVehicleType(undefined);

      // Reset UI elements:
      setVehicleRadios(undefined);
      setConfirmButton(undefined);
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
          defaultValue={savedInfo?.vehicleType}
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
    showConfirmButton();
  }, [vehicleType]);

  // Scroll to the bottom to see any new elements that appear.
  useEffect(() => {
    const elements = document.querySelectorAll(`[id*='-InputContainer']`);
    if (elements && elements.length) elements[elements.length - 1].scrollIntoView();
  }, [agencySelect, vehicleRadios, confirmButton]);

  function radioButtonOnChange(key: string, value: string | undefined) {
    setVehicleType(value);
    updateState(key, value);
  }

  function selectAgencyOnChange(key: string, value: string | undefined) {
    setVehicleRadios(undefined);
    setSelectedAgencyId(value);
    updateState(key, value);
  }

  function selectStateOnChange(key: string, value: AussieState | undefined) {
    setAussieState(value);
    updateState(key, value);
  }

  function showConfirmButton() {
    setConfirmButton(
      <div className='row centerChildren fadeInOnLoad'>
        <button className='btn bg-pink' onMouseUp={() => onSubmit()}>
          Confirm Scenario
        </button>
      </div>
    );
  }

  return (
    <div className='fadeInOnLoad' id='scenarioDefaultView'>
      <p>
        Please select the state and specific transit agency to simulate. This program uses the General Transit Feed
        Specification (GTFS) Schedule format. More information about GTFS can be found at{' '}
        <Link link='https://developers.google.com/transit/gtfs/' /> and <Link link='https://gtfs.org/' />.
      </p>
      <Select
        name={'state'}
        label='Select a State'
        options={AussieStateOptions()}
        updateState={selectStateOnChange}
        defaultValue={savedInfo?.state}
      />
      {agencySelect}
      {vehicleRadios}
      {confirmButton}
      <div></div>
    </div>
  );
};
