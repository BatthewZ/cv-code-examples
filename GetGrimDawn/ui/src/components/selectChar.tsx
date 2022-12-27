import {Character} from '../types/types';

type SCProps = {
  characters: Character[];
  onChange: Function;
};

export const SelectCharacter: React.FC<SCProps> = ({characters, onChange}) => {
  if (!characters.length) return <></>;

  function getCharOptionName(char: Character) {
    const class1 = char.classes[0];
    if (!class1) return 'Unknown Class';

    const class2 = char.classes[1];

    return `${class1}${class2 ? ' + ' + class2 : ''}`;
  }

  function mapOptions() {
    return characters.map((char, index) => {
      const name = getCharOptionName(char);
      return (
        <option value={index} key={index + name}>
          {index + 1 + `: ${name}`}
        </option>
      );
    });
  }

  return (
    <div className='fadeInOnLoad'>
      <h3>Select Character to View</h3>
      <select onChange={(e) => onChange(e.currentTarget.value)} id='charSelect'>
        <option value={undefined}>Select Character...</option>
        {mapOptions()}
      </select>
      <p></p>
    </div>
  );
};
