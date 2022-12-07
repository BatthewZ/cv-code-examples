import {useEffect, useState} from 'react';
import {loadFromLocalStorage} from '../../helper/localStorageHelpers';
import {clearError, setError} from '../../helper/uiHelpers';
import {emitMsg, GetSocket} from '../../websocket/websocket';
import {Link} from '../misc/link';

type ImportViewProps = {
  updateState: Function;
  onSubmit: Function;
};

export const ScenarioImportView: React.FC<ImportViewProps> = ({updateState, onSubmit}: ImportViewProps) => {
  const [importFilePath, setImportFilePath] = useState('');
  const [confirmButton, setConfirmButton] = useState<JSX.Element | undefined>();
  // Load saved info:
  useEffect(() => {
    const savedInfo = loadFromLocalStorage();
    if (savedInfo && savedInfo.scenario) setImportFilePath(savedInfo.scenario.importPath);
  }, []);
  // Remove confirm button if filepath has changed.
  // This forces users to validate filepath after each change.
  useEffect(() => setConfirmButton(undefined), [importFilePath]);

  const socket = GetSocket();
  function updateFilePath(value: string) {
    setImportFilePath(value);
    updateState('importPath', value);
  }

  async function validateFolder() {
    clearError('importPath');
    emitMsg('checkImportPath', importFilePath);
  }

  socket.on('response', (response) => {
    if (response.errMsg) {
      setError('importPath', response.errMsg);
      return;
    }
    setConfirmButton(
      <button className='btn bg-pink fadeInOnLoad' onClick={() => onSubmit()}>
        Confirm Scenario
      </button>
    );
  });

  return (
    <div className='column fadeInOnLoad'>
      <p>
        Please nominate the file path of the transit data to import, which includes the GTFS Schedule (Static) files.
        Please ensure that all required GTFS files are included as nominated by the standard (
        <Link link='https://developers.google.com/transit/gtfs/' />
        ). A good list of publicly available GTFS data globally can be found{' '}
        <Link link='https://database.mobilitydata.org/' />.
      </p>
      <label htmlFor='importPath'>
        <strong>Paste the file path to your import folder:</strong>
      </label>
      {/* @ ts-expect-error */}
      {/* <input type='file' id='gtfs-ImportPath' webkitdirectory='true' /> */}
      <div id='importPath-InputContainer'>
        <input
          className='width100'
          type='text'
          id='importPath'
          name='importPath'
          onChange={(e) => {
            updateFilePath(e.target.value);
          }}
          defaultValue={importFilePath}
        />
      </div>
      <span id='errMsg-importPath' className='errMsg'></span>
      <div>
        {/* <button
          className='btn bg-greyBlue1'
          onClick={() => {
            // Currently broken in the backend:
            emitMsg('selectFolder', '');
          }}
        >
          Choose Folder
        </button> */}
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
      <div className='row'>{confirmButton}</div>
    </div>
  );
};
