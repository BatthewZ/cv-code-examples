import React, {useEffect, useState} from 'react';
import './style/App.css';
import {getTestChar} from './testing/testingThings';
import {Character} from './types/types';
import {GetCharacterInput} from './components/getCharacter';
import {SelectCharacter} from './components/selectChar';
import {CharacterOverview} from './views/characterOverview';
import {TeamBenefitsView} from './views/teamBenefitsView';
import {loadSavedChars, saveCharToLocalStorage} from './helpers/saveCharToLocalStorage';

// TODO:

// 	Team View:
// - All Skills, taking the highest of each parent skill and their children.
// - Show combined benefits of all

//  Team Overview:
//  - See collective team buffs in a team (choosing highest parent skills and relevant children)
//  - See which skills are being overriden by a teammate's buffs.
//  - Calculate unique buffs for each build on the team

// Parents can be determined by: !parentSkillIDs || parentSkillIDs === null
// 1) Get parent skills of each build
// 2) Compare their buffedLevel (consider: granted skills have no buffed level)
// 3) Choose highest of each.

function App() {
  const [view, setView] = useState(<></>);
  const [characters, setCharacters] = useState<Character[]>(loadSavedChars);
  const [selectedChar, setSelectedChar] = useState<number | undefined>(undefined);

  // function loadTestChar() {
  //   const char = getTestChar();
  //   if (char) setCharacters([char]);
  // }
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
      {/* <button onClick={loadTestChar}>Load test char</button>
      <button
        onClick={() => {
          console.log(characters);
        }}
      >
        View chars
      </button> */}
      <GetCharacterInput addCharacter={updateCharacters} numOfChars={characters.length} />
      <SelectCharacter characters={characters} onChange={setSelectedChar} />
      {selectedChar ? <CharacterOverview deleteChar={removeCharacter} character={characters[selectedChar]} /> : ''}
      {selectedChar ? <TeamBenefitsView character={characters[selectedChar]} /> : ''}
    </div>
  );
}

export default App;
