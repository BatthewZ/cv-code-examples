import {useEffect, useState} from 'react';
import {getCharacters, newCharacter} from '../apiCalls/apiCalls';
import {LoadingModal} from '../components/miscUI/loadingModal';
import {MappedCharacters} from '../components/miscUI/mappedCharacters';
import {Character, getNewCharacter} from '../types/types';

type CharSelectProps = {
  chooseChar: (character: Character) => void;
  logout: Function;
};

export const CharacterSelect: React.FC<CharSelectProps> = ({chooseChar, logout}: CharSelectProps) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(true);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      getCharacters(user).then((data) => {
        setCharacters(data);
        setModalIsOpen(false);
      });
    }
  }, []);

  function createCharacter() {
    const newChar = getNewCharacter();
    newCharacter(newChar).then(() => chooseChar(newChar));
  }

  return (
    <div className='centerScreen fadeInOnLoad'>
      <LoadingModal content={<h1>'Loading Characters...'</h1>} isActive={modalIsOpen} />
      <h2>{('Welcome ' + sessionStorage.getItem('user')).toUpperCase()}</h2>

      {characters.length ? (
        <>
          <h3>Character Select: </h3>
          <div className='fadeInOnLoad'>
            <table className='width75Percent'>
              <tr>
                <th>Character Name</th>
                <th>Race</th>
                <th>Class</th>
                <th>Level</th>
              </tr>
              <MappedCharacters chooseChar={chooseChar} characters={characters} />
            </table>
          </div>
        </>
      ) : (
        ''
      )}
      <p></p>
      <button onClick={createCharacter}>Create New Character</button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};
