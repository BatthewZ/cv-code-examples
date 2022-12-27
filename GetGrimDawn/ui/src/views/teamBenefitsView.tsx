import {useState} from 'react';
import {DetailsFactory} from '../components/detailsFactory';
import {Character} from '../types/types';

type TBVProps = {
  character: Character;
};

type viewOptions = 'Team Skills' | 'Healing' | 'All Skills' | '';

export const TeamBenefitsView: React.FC<TBVProps> = ({character}) => {
  const [view, setView] = useState<viewOptions>('');

  if (!character) return <></>;

  function getRadioLinks() {
    return ['Team Skills', 'Healing', 'Debuffs', 'All Skills'].map((link) => (
      <div className='linkText' onClick={() => setView(link as viewOptions)}>
        {link}
      </div>
    ));
  }

  return (
    <fieldset>
      <h2>Team Benefits</h2>
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
