import {useState} from 'react';
import {RadioButtons} from '../inputs/radioButtons';
import {
  getNewScenarioFormState,
  getSavedOrNewScenarioForm,
  isScenarioFormKey,
  ScenarioFormState,
  ScenFormStateKey,
} from '../../formstate/scenario_formstate';
import {AussieState} from '../../helper/aussie_states';
import {ScenarioDefaultView} from './scenario_defaultView';
import {ScenarioImportView} from './scenario_importView';
import {LoadingModal} from '../misc/loadingModal';
import {clearError, setError} from '../../helper/uiHelpers';
import {allHardcodedAgencies, getHardCodedAgencies} from '../../helper/hardcodedAgencies';
import {loadFromLocalStorage, saveToLocalStorage} from '../../helper/localStorageHelpers';
import {emitMsg, GetSocket} from '../../websocket/websocket';
import {Agency, AgencyData, DataForCharFormView} from '../../helper/types';
import {capitalizeFirstLetter} from '../../helper/stringFormatters';
import {getAgencyBySelectValue} from '../../helper/agencyFormatters';

const PlaceholderData = {
  testAgencies: allHardcodedAgencies,
  // [
  //   {id: 'Agency 1', state: 'NSW' as AussieState, name: 'Mason Buses', vehicleTypes: ['Bus', 'Ferry']},
  //   {id: 'Agency 2', state: 'TAS' as AussieState, name: 'Mersey Link', vehicleTypes: ['Ferry']},
  //   {id: 'Agency 3', state: 'WA' as AussieState, name: 'TransAlbany', vehicleTypes: ['Bus', 'Rail', 'Tram']},
  // ],
};

type ScenarioFormProps = {
  agencies: Agency[];
  // onSuccess: Function;
  onSuccess: (data: DataForCharFormView) => void;
};

export const ScenarioForm: React.FC<ScenarioFormProps> = ({agencies, onSuccess}: ScenarioFormProps) => {
  const [formState, setFormState] = useState(getSavedOrNewScenarioForm());
  const [modal, setModal] = useState(<></>);
  const [view, setView] = useState<'default' | 'import' | undefined>(
    formState.gtfs === 'default' || formState.gtfs === 'import' ? formState.gtfs : undefined
  );

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
      const settingsSaved = userSettings && userSettings.saved === true;
      if (settingsSaved) saveToLocalStorage(updatedState, 'scenario');
      return updatedState;
    });
  }

  function showTooltipModal(modalIsOpen: boolean, blurb?: JSX.Element) {
    setModal(
      modalIsOpen ? (
        <LoadingModal content={blurb ?? <></>} isActive={true} closeButton={() => setModal(<></>)} />
      ) : (
        <></>
      )
    );
  }

  const gtfsOptions = [
    {
      value: 'default',
      label: 'Use Default',
      onClick: () => {
        // Clear Import View formstate:
        updateFormState('importPath', undefined);

        setView('default');
      },
    },
    {
      value: 'import',
      label: 'Import Custom Data',
      onClick: () => {
        // Clear Default View formstate:
        updateFormState('state', undefined);
        updateFormState('agency', undefined);
        updateFormState('vehicleType', undefined);

        setView('import');
      },
    },
  ];

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

  function onSubmit() {
    // ... after validation ...
    const isValid = formIsValid();

    if (!isValid) return;

    // get agency by id.

    // const selectedAgency = agencies.find((agency) => agency.id === formState.agency);
    const selectedAgency = getAgencyBySelectValue(agencies, formState.agency);

    console.log(selectedAgency);

    if (!selectedAgency || formState.vehicleType === undefined || formState.state === undefined) {
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

  // GetSocket().on('update', (msg) => {
  //   // if (msg === 'fin') onSuccess(formState);
  // });

  return (
    <div className='scenarioForm fadeInOnLoad'>
      {/* <button onClick={() => console.log(formState)}>Check FormState</button> */}
      {modal}
      <RadioButtons
        name={'gtfs'}
        label='GTFS Input'
        options={gtfsOptions}
        updateState={updateFormState}
        defaultValue={formState.gtfs}
      />
      {view === 'default' ? (
        <ScenarioDefaultView
          updateState={updateFormState}
          agencies={agencies}
          setModal={showTooltipModal}
          onSubmit={onSubmit}
          savedInfo={{state: formState.state, agencyId: formState.agency, vehicleType: formState.vehicleType}}
        />
      ) : (
        <></>
      )}
      {view === 'import' ? <ScenarioImportView updateState={updateFormState} onSubmit={onSubmit} /> : <></>}
    </div>
  );
};
