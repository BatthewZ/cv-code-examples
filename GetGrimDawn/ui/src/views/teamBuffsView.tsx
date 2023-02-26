import {GetCharacterInput} from '../components/getCharacter';
import {SelectCharacter} from '../components/selectChar';
import {UploadTeamSummary} from '../components/uploadTeamSummary';
import {Character} from '../types/types';
import {CharacterOverview} from './characterOverview';
import {TeamBenefitsView} from './teamBenefitsView';

type TBVProps = {
  updateCharacters: (char: Character) => void;
  setView: Function;
  characters: Character[];
  setSelectedChar: Function;
  selectedChar?: number;
  removeCharacter: Function;
  setCharacters: Function;
};

export const TeamBuffsView: React.FC<TBVProps> = ({
  updateCharacters,
  setView,
  characters,
  selectedChar,
  setSelectedChar,
  removeCharacter,
  setCharacters,
}) => {
  return (
    <div>
      <GetCharacterInput addCharacter={updateCharacters} numOfChars={characters.length} />
      <span className='row center'>
        <button onClick={() => setView(undefined)}>Go Back</button>
      </span>
      <SelectCharacter characters={characters} onChange={setSelectedChar} />
      <UploadTeamSummary setCharacters={setCharacters} />
      {characters.length > 1 && <button onClick={() => setView('teamSummary')}>View Team Summary</button>}
      {selectedChar ? <CharacterOverview deleteChar={removeCharacter} character={characters[selectedChar]} /> : ''}
      {selectedChar ? <TeamBenefitsView character={characters[selectedChar]} /> : ''}
    </div>
  );
};
