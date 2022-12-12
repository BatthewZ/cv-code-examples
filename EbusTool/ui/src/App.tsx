import React, {useEffect, useState} from 'react';
import './styles/style.css';
import './styles/backgroundColors.css';
import {ScenarioForm} from './components/forms/scenario_form';
import {ScenarioMainBlurb} from './components/forms/scenario_mainBlurb';
import {CharacteristicsForm} from './components/forms/char_form';
import {CharacteristicsMainBlurb} from './components/forms/char_mainBlurb';
import {emitMsg, GetSocket} from './websocket/websocket';
import {LoadingModal} from './components/misc/loadingModal';
import {ModalBlurb} from './components/misc/modalBlurb';
import {StatusUpdatesView} from './components/misc/statusUpdatesView';
import {DataForCharFormView} from './helper/types';
import {ResultsPage} from './components/resultsPage/resultsPage';
import {loadFromLocalStorage, setSaveToLocalStorage} from './helper/localStorageHelpers';

// TODO:
// Tweak placeholder information for footer blurb
// Add validation for maximum numbers for all char view inputs
// Tweak names of graphs in results > chart pages

setSaveToLocalStorage(true);

console.log('--------------- START AGAIN');

function App() {
  const [mainContent, setMainContent] = useState(<h1>Loading Data...</h1>);
  const [mainBlurb, setMainBlurb] = useState(<ScenarioMainBlurb />);
  const [loadingTitle, setLoadingTitle] = useState('');
  const [loadingModal, setLoadingModal] = useState(<></>);
  const [view, setView] = useState<'form' | 'results'>('form');
  const [resultsPage, setResultsPage] = useState<JSX.Element | undefined>();

  GetSocket().on('agencyData', (emittedDataFromServer) => {
    const savedSettings = loadFromLocalStorage();
    setMainContent(
      <ScenarioForm
        onSuccess={setCharacteristicsView}
        agencies={emittedDataFromServer}
        gtfsView={savedSettings.scenario.gtfs}
      />
    );
    setMainBlurb(<ScenarioMainBlurb />);
    setLoadingTitle('Processing GTFS Inputs...');
  });

  useEffect(() => {
    setScenarioView();
  }, []);

  function setScenarioView() {
    emitMsg('getAgencies', {});
  }

  function setCharacteristicsView(data: DataForCharFormView) {
    console.log('Setting data...');
    console.log(data);
    setMainBlurb(<CharacteristicsMainBlurb data={data} />);
    setMainContent(
      <CharacteristicsForm
        onSuccess={() => {
          console.log('Yay ya did it! This is clearly a placeholder function.');
        }}
        goBack={setScenarioView}
        vehicleType={data.vehicleType}
        selectedGTFS={data.gtfs}
      />
    );
    setLoadingTitle('Calculating Scenario...');
  }

  GetSocket().on('graphData', (data) => {
    setView('results');
    setResultsPage(<ResultsPage data={data} goBack={() => setView('form')} />);
  });

  GetSocket().on('error', (errMsg) => {
    if (errMsg.includes('\n')) errMsg = errMsg.split('\n').map((line: string) => <p>{line}</p>);

    setLoadingModal(
      <LoadingModal
        content={<ModalBlurb title={'Error:'} content={<div className='errMsg'>{errMsg}</div>} />}
        isActive={true}
        closeButton={() => setLoadingModal(<></>)}
      />
    );
  });

  GetSocket().on('update', (msg) => {
    if (msg === 'fin') return setLoadingModal(<></>);

    setLoadingModal(
      <LoadingModal
        content={<StatusUpdatesView title={loadingTitle} statusMessage={msg} />}
        isActive={true}
        // closeButton={() => setLoadingModal(<></>)}
      />
    );
  });

  GetSocket().on('screenshotSaved', (msg) => {
    setLoadingModal(
      <LoadingModal
        content={<StatusUpdatesView title={'Screen Shot Saved!'} statusMessage={'Screenshot saved to: ' + msg} />}
        isActive={true}
        closeButton={() => setLoadingModal(<></>)}
      />
    );
  });

  return (
    <div>
      {loadingModal}
      <div className='bg'></div>
      <div className='uiContainer'>
        <div className='ui fadeInOnLoad'>
          {getHeader()}
          <main>
            {view === 'form' ? (
              <>
                <div className='contentPanel' id='mainBlurb'>
                  {mainBlurb}
                  <div>
                    {resultsPage ? (
                      <button className='btn bg-pink' onClick={() => setView('results')}>
                        View Previous Results
                      </button>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className='contentPanel' id='mainContent'>
                  {mainContent}
                  <div></div>
                </div>
              </>
            ) : (
              ''
            )}
            {view === 'results' ? <>{resultsPage}</> : ''}
          </main>
          {getFooter()}
        </div>
      </div>
    </div>
  );
}

function getFooter() {
  return (
    <footer id='mainFooter'>
      <div className='footerBlurb'>
        <p>
          This tool was developed by K. Purnell at the University of New South Wales in 2022, and funded by the Digital
          Grid Futures Institute (DGFI).
        </p>
        <p>
          (input later citations, copyright info, Bens deets, Aus Gov stipend & Darcy & Patricia Wentworth Foundation
          etc)
        </p>
      </div>
      <div className='footerLogos'>
        <img src={require('./img/unsw.png')} width='40%' />
        <img src={require('./img/futures_institute.png')} width='40%' />
      </div>
    </footer>
  );
}

function getHeader() {
  return (
    <header id='mainHeader'>
      <div>
        <h1>Electrified Public Transit Tool</h1>
      </div>
      <div>
        <p>
          This tool estimates the potential charging demands of a fleet of electric buses or ferries based on their
          existing transit schedule.
        </p>
      </div>
    </header>
  );
}

export default App;
