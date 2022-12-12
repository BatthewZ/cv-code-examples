import {useState} from 'react';
import {RadioButtons} from '../inputs/radioButtons';
import {getNewScenarioFormState, ScenarioFormState} from '../../formstate/scenario_formstate';
import {ScenarioDefaultView} from './scenario_defaultView';
import {ScenarioImportView} from './scenario_importView';
import {LoadingModal} from '../misc/loadingModal';
import {allHardcodedAgencies, getHardCodedAgencies} from '../../helper/hardcodedAgencies';
import {Agency, AgencyData, DataForCharFormView, SavedScenFormInfo} from '../../helper/types';
import {saveToLocalStorage} from '../../helper/localStorageHelpers';

const PlaceholderData = {
  testAgencies: allHardcodedAgencies,
};

type ScenarioFormProps = {
  agencies: Agency[];
  onSuccess: (data: DataForCharFormView) => void;
  gtfsView?: 'default' | 'import' | undefined;
  // savedInfo?: ScenarioFormState;
};

export const ScenarioForm: React.FC<ScenarioFormProps> = ({gtfsView, agencies, onSuccess}: ScenarioFormProps) => {
  const [modal, setModal] = useState(<></>);
  const [view, setView] = useState(gtfsView);

  // console.log('Saved Info is: ', savedInfo);

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
        const newFormState = getNewScenarioFormState();
        newFormState.gtfs = 'default';
        saveToLocalStorage(newFormState, 'scenario');
        setView('default');
      },
    },
    {
      value: 'import',
      label: 'Import Custom Data',
      onClick: () => {
        const newFormState = getNewScenarioFormState();
        newFormState.gtfs = 'import';
        saveToLocalStorage(newFormState, 'scenario');
        setView('import');
      },
    },
  ];

  return (
    <div className='scenarioForm fadeInOnLoad'>
      {modal}
      <RadioButtons
        name={'gtfs'}
        label='GTFS Input'
        options={gtfsOptions}
        updateState={() => {}}
        defaultValue={gtfsView}
      />
      {view === 'default' ? (
        <ScenarioDefaultView onSuccess={onSuccess} setModal={showTooltipModal} agencies={agencies} />
      ) : (
        <></>
      )}
      {view === 'import' ? (
        <ScenarioImportView agencies={agencies} setModal={showTooltipModal} onSuccess={onSuccess} />
      ) : (
        <></>
      )}
    </div>
  );
};
