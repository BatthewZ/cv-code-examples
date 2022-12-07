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

// TODO:

// vehicleType select buttons - capitalise

// optionsTable - Move this to the start of the 'getAgencies()' function.

// import custom data:
// Do a check for the folder path. If all works, then make it behaves like GTFS Input after the folder has been validated.

function App() {
  // const [mainContent, setMainContent] = useState(<ScenarioForm onSuccess={setCharacteristicsView} agencies={allHardcodedAgencies} />);
  // const [mainContent, setMainContent] = useState(<h1><button onClick={setScenarioView}>Test</button>Loading Data...</h1>);
  const [mainContent, setMainContent] = useState(<h1>Loading Data...</h1>);
  const [mainBlurb, setMainBlurb] = useState(<ScenarioMainBlurb />);
  const [loadingModal, setLoadingModal] = useState(<></>);
  const [view, setView] = useState<'form' | 'results'>('form');

  GetSocket().on('agencyData', (emittedDataFromServer) => {
    // const agencies = getHardCodedAgencies(emittedDataFromServer.agencyData);
    setMainContent(<ScenarioForm onSuccess={setCharacteristicsView} agencies={emittedDataFromServer} />);
    setMainBlurb(<ScenarioMainBlurb />);
  });

  useEffect(() => {
    setScenarioView();
  }, []);

  console.log('--------------- START AGAIN');

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
  }

  function setScenarioView() {
    emitMsg('getAgencies', {});
  }

  function testingWebSocket() {
    emitMsg('runApp', {});
  }

  GetSocket().on('error', (errMsg) => {
    setLoadingModal(
      <LoadingModal
        // content={<StatusUpdatesView title={'Processing GTFS Inputs...'} statusMessage={msg} />}
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
        content={<StatusUpdatesView title={'Processing GTFS Inputs...'} statusMessage={msg} />}
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
                    <button className='btn bg-pink' onClick={() => setView('results')}>
                      Skip to ResultsPage
                    </button>
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
            {view === 'results' ? <ResultsPage goBack={() => setView('form')} /> : ''}
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
