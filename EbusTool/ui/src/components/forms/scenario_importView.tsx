import {useEffect, useState} from 'react';
import {getSavedOrNewScenarioForm} from '../../formstate/scenario_formstate';
import {loadFromLocalStorage, saveSinglePropertyToLocalStorage} from '../../helper/localStorageHelpers';
import {Agency} from '../../helper/types';
import {clearError, setError} from '../../helper/uiHelpers';
import {emitMsg, GetSocket} from '../../websocket/websocket';
import {Link} from '../misc/link';
import {ScenFormProps} from './scenario_defaultView';
import {ScenarioFormInputs} from './scenario_formInputs';

export const ScenarioImportView: React.FC<ScenFormProps> = ({setModal, onSuccess}: ScenFormProps) => {
  const [importFilePath, setImportFilePath] = useState(getSavedOrNewScenarioForm()?.importPath ?? '');
  const [formInputs, setFormInputs] = useState<JSX.Element | undefined>();
  const [selectedAgency, setSelectedAgency] = useState<Agency | undefined>();
  const socket = GetSocket();

  // Load saved info:
  useEffect(() => {
    if (importFilePath) {
      validateFolder();
    }
  }, []);

  useEffect(() => {
    setFormInputs(undefined);
    saveSinglePropertyToLocalStorage('importPath', importFilePath, 'scenario');
  }, [importFilePath]);

  function validateFolder() {
    if (!importFilePath || !importFilePath.trim()) {
      return setError('importPath', 'You must enter a valid file path.');
    }
    clearError('importPath');
    emitMsg('checkImportPath', importFilePath);
  }

  socket.on('customAgencyData', (customAgencies) => {
    setFormInputs(
      <ScenarioFormInputs gtfsView='import' onSuccess={onSuccess} setModal={setModal} agencies={customAgencies} />
    );
  });

  return (
    <div className='column fadeInOnLoad'>
      <p>
        Please nominate the file path of the transit data to import, which includes the GTFS Schedule (Static) files.
        Please ensure that all required GTFS files are included as nominated by the standard (
        <Link url='https://developers.google.com/transit/gtfs/' />
        ). A good list of publicly available GTFS data globally can be found{' '}
        <Link url='https://database.mobilitydata.org/' />.
      </p>
      <label htmlFor='importPath'>
        <strong>Paste the file path to your import folder:</strong>
      </label>
      <div id='importPath-InputContainer'>
        <input
          className='width100'
          type='text'
          id='importPath'
          name='importPath'
          onChange={(e) => {
            setImportFilePath(e.target.value);
          }}
          defaultValue={importFilePath}
        />
      </div>
      <span id='errMsg-importPath' className='errMsg'></span>
      <div>
        <button
          className='btn bg-greyBlue2'
          onClick={(e) => {
            e.preventDefault();
            validateFolder();
          }}
        >
          Validate Folder
        </button>
      </div>
      {formInputs}
    </div>
  );
};
