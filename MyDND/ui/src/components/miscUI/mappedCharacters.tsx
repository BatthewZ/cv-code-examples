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
            <td>{char.charInfo.charName ?? 'Unnamed Character'}</td>
            <td>{char.charInfo.race}</td>
            <td>{char.charInfo.characterClass}</td>
            <td>{char.charInfo.level}</td>
            <td>
              <button onClick={() => chooseChar(char)}>Select</button>
            </td>
          </tr>
        );
      });
  }
  return <>{mapCharacters()}</>;
};
