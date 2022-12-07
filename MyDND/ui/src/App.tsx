import React, {useEffect, useState} from 'react';
import './style/App.css';
import {makeMyCode} from './helper/makeMyCode';
import {CharacterSheet} from './pages/characterSheet';
import {CharacterSelect} from './pages/charSelect';
import {Login} from './pages/login';
import {Register} from './pages/register';
import {LoadingModal} from './components/miscUI/loadingModal';
import {Character} from './types/types';

// TODO:

function App() {
  const [content, setContent] = useState(<Login toRegister={setRegisterView} onSuccess={setCharSelect} />);
  const [modalOpen, setModalOpen] = useState(false);

  function setLoginView() {
    sessionStorage.removeItem('user');
    setContent(<Login toRegister={setRegisterView} onSuccess={setCharSelect} />);
  }

  function setRegisterView() {
    setContent(<Register goBack={setLoginView} onSuccess={() => {}} />);
  }

  function setCharSelect() {
    setContent(<CharacterSelect chooseChar={viewCharacterSheet} logout={setLoginView} />);
  }

  function viewCharacterSheet(char: Character) {
    setContent(<CharacterSheet character={char} toCharacterSelect={setCharSelect} logout={setLoginView} />);
  }

  return (
    <div className=''>
      <LoadingModal content={'Yay'} isActive={modalOpen} closeButton={() => setModalOpen(false)} />
      {content}
    </div>
  );
}

export default App;
