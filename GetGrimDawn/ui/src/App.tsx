import React, {useEffect, useState} from 'react';
import './style/App.css';
import {Character, ViewLabel} from './types/types';
import {loadSavedChars, saveCharToLocalStorage} from './helpers/saveCharToLocalStorage';
import {Banner} from './components/banner';
import {SelectView} from './components/selectView';
import {WelcomeMsg} from './components/welcomeMessage';
import {TeamBuffsView} from './views/teamBuffsView';
import {TeamSummary} from './views/teamSummary';

function App() {
  const [view, setView] = useState<ViewLabel>();
  const [characters, setCharacters] = useState<Character[]>(loadSavedChars);
  const [selectedChar, setSelectedChar] = useState<number | undefined>(undefined);

  useEffect(() => {
    saveCharToLocalStorage(characters);
  }, [characters]);

  function updateCharacters(character: Character) {
    if (characters.length >= 4) return;
    const newChars = [...characters, character];
    setCharacters((prev) => newChars);
  }

  function removeCharacter(character: Character) {
    if (selectedChar) {
      setCharacters((prev) => [...prev].filter((c) => c !== character));
      setSelectedChar(undefined);
      const element = document.getElementById('charSelect') as HTMLInputElement;
      if (element) element.value = '';
    }
  }

  return (
    <div className='App'>
      <div className='main'>
        <Banner />
        <WelcomeMsg />
        <SelectView setView={setView} currentView={view} />
        {view === 'teamBuffs' && (
          <>
            <TeamBuffsView
              setCharacters={setCharacters}
              updateCharacters={updateCharacters}
              setView={setView}
              characters={characters}
              setSelectedChar={setSelectedChar}
              selectedChar={selectedChar}
              removeCharacter={removeCharacter}
            />
            {/* {characters.length > 1 && <button onClick={() => setView('teamSummary')}>View Team Summary</button>} */}
          </>
        )}
        {view === 'teamSummary' && (
          <div className='fadeInOnLoad'>
            <div className='row center'>
              <button onClick={() => setView('teamBuffs')}>View Individual Builds</button>
              <button onClick={() => setView(undefined)}>Back to Home</button>
            </div>
            <TeamSummary chars={characters} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
