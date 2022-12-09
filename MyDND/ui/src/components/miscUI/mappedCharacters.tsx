import {Character} from '../../types/types';

type MapCharProps = {
  chooseChar: Function;
  characters: Character[];
};

export const MappedCharacters: React.FC<MapCharProps> = ({chooseChar, characters}: MapCharProps) => {
  function mapCharacters() {
    if (characters.length)
      return characters.map((char) => {
        return (
          <tr>
            <td>{char.charInfo.charName === '' ? 'Unnamed Adventurer' : char.charInfo.charName}</td>
            <td>{char.charInfo.race === '' ? 'TBC' : char.charInfo.race}</td>
            <td>{char.charInfo.characterClass === '' ? 'TBC' : char.charInfo.characterClass}</td>
            <td>{char.charInfo.level === '' ? 'TBC' : char.charInfo.level}</td>
            <td>
              <button onClick={() => chooseChar(char)}>Select</button>
            </td>
          </tr>
        );
      });
  }
  return <>{mapCharacters()}</>;
};
