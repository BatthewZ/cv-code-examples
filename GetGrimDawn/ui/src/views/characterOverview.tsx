import {useState} from 'react';
import {DetailsFactory} from '../components/detailsFactory';
import {Character} from '../types/types';

type COProps = {
  character?: Character;
  deleteChar: Function;
};

type viewOptions = 'Items' | 'Devotions' | 'Skills' | '';

export const CharacterOverview: React.FC<COProps> = ({character, deleteChar}) => {
  const [view, setView] = useState<viewOptions>('');

  if (!character) return <></>;

  function getRadioLinks() {
    return ['Items', 'Devotions', 'Skills'].map((link) => (
      <div className='linkText' onClick={() => setView(link as viewOptions)}>
        {link}
      </div>
    ));
  }

  function downloadJson() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(character));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'charData.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  return (
    <fieldset className='characterOverview'>
      <h2>Character Overview: {character.classes.map((c) => c + ' ')}</h2>
      <div>
        <a href={character.url} target='_blank'>
          View build in Grimtools
        </a>
      </div>
      <div className='linkText' onClick={downloadJson}>
        Download Character JSON
      </div>
      <div
        className='linkText'
        onClick={() => {
          deleteChar(character);
        }}
      >
        Remove Character
      </div>
      <p></p>
      <div className='row center h3'>
        {getRadioLinks()}
        {view ? (
          <div className='linkText' onClick={() => setView('')}>
            Hide
          </div>
        ) : (
          ''
        )}
      </div>
      <div>
        <h2>{view}</h2>
        <DetailsFactory character={character} viewType={view} />
      </div>
    </fieldset>
  );
};
