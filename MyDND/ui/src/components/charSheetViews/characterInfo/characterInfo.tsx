import {EditableText} from '../../inputs/EditableText';

type ViewProps = {
  charName: string;
  setCharName: Function;
  characterClass: string;
  setCharacterClass: Function;
  race: string;
  setRace: Function;
  level: string;
  setLevel: Function;
  alignment: string;
  setAlignment: Function;
  experience: string;
  setExperience: Function;
  background: string;
  setBackground: Function;
};

export const CharacterInfo: React.FC<ViewProps> = (props) => {
  const {
    charName,
    setCharName,
    characterClass,
    setCharacterClass,
    race,
    setRace,
    level,
    setLevel,
    alignment,
    setAlignment,
    experience,
    setExperience,
    background,
    setBackground,
  } = props;

  function getAlignmentOptions() {
    const alignments = [
      'Lawful Good',
      'Neutral Good',
      'Chaotic Good',
      'Lawful Neutral',
      'True Neutral',
      'Chaotic Neutral',
      'Lawful Evil',
      'Neutral Evil',
      'Chaotic Evil',
    ];
    return alignments.map((a) => <option value={a}>{a}</option>);
  }

  return (
    <fieldset className='charInfo column centerChildren'>
      <div className='rowWrap spaceEvenly'>
        <EditableText fieldName={'charName'} value={charName + ''} confirmEdit={setCharName} title={'Character Name'} />
        <EditableText fieldName={'class'} value={characterClass + ''} confirmEdit={setCharacterClass} title={'Class'} />
        <EditableText fieldName={'race'} value={race + ''} confirmEdit={setRace} title={'Race'} />
        <EditableText
          fieldName={'level'}
          value={level + ''}
          confirmEdit={setLevel}
          title={'Level'}
          inputType='number'
        />
      </div>
      <div>
        <hr />
      </div>
      <div className='rowWrap spaceEvenly baseline'>
        <div>
          <p>
            <strong>Alignment:</strong>
          </p>
          <select
            onChange={(e) => {
              setAlignment(e.currentTarget.value);
            }}
            defaultValue={alignment}
          >
            <option value=''>Select Alignment...</option>
            {getAlignmentOptions()}
          </select>
        </div>
        <EditableText
          fieldName={'experience'}
          value={experience + ''}
          confirmEdit={setExperience}
          title={'Experience'}
        />
      </div>
      <div>
        <hr />
      </div>
      <EditableText
        fieldName={'background'}
        value={background + ''}
        confirmEdit={setBackground}
        title={'Background'}
        inputType='textarea'
      />
    </fieldset>
  );
};
