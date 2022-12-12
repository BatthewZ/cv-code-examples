import {Agency, DataForCharFormView, SavedScenFormInfo} from '../../helper/types';
import {ScenarioFormState} from '../../formstate/scenario_formstate';
import {Link} from '../misc/link';
import {ScenarioFormInputs} from './scenario_formInputs';

export type ScenFormProps = {
  agencies: Agency[];
  savedSettings?: ScenarioFormState;
  setModal: Function;
  onSuccess: (data: DataForCharFormView) => void;
  // savedInfo?: ScenarioFormState;
};

// type loadStatus = 'loading' | 'done';

export const ScenarioDefaultView: React.FC<ScenFormProps> = ({agencies, setModal, onSuccess}: ScenFormProps) => {
  return (
    <div className='fadeInOnLoad' id='scenarioDefaultView'>
      <p>
        Please select the state and specific transit agency to simulate. This program uses the General Transit Feed
        Specification (GTFS) Schedule format. More information about GTFS can be found at{' '}
        <Link url='https://developers.google.com/transit/gtfs/' /> and <Link url='https://gtfs.org/' />.
      </p>
      <ScenarioFormInputs
        gtfsView='default'
        onSuccess={onSuccess}
        setModal={setModal}
        agencies={agencies}
        // savedInfo={savedInfo}
      />
      <div></div>
    </div>
  );
};
