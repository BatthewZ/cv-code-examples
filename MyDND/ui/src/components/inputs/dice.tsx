import {useEffect, useState} from 'react';
import {DiceType} from '../../types/types';

type DiceProps = {
  num: number;
  type: DiceType;
  title?: string;
  updateState: Function;
};

export const Dice: React.FC<DiceProps> = ({num, type, title, updateState}: DiceProps) => {
  const [editMode, setEditMode] = useState(false);
  const [numOfDice, setNumOfDice] = useState<number>(num);
  const [typeOfDice, setTypeOfDice] = useState<number>(type);

  useEffect(() => {
    updateState(numOfDice + 'd' + typeOfDice);
  }, [numOfDice, typeOfDice]);

  function toggleEditMode() {
    setEditMode(!editMode);
  }

  function mapDiceOptions() {
    const diceTypes = [2, 4, 6, 8, 10, 12, 20];
    return diceTypes.map((type) => {
      return <option value={type}>{type}</option>;
    });
  }

  return (
    <div className='dice'>
      <strong>{title ? title + ': ' : ''}</strong>
      {editMode ? (
        <div className='column centerChildren'>
          <div className='row centerChildren'>
            <input
              type='number'
              onChange={(e) => {
                const val = e.target.value;
                if (val) {
                  if (+val > 100) {
                    setNumOfDice(100);
                  } else if (+val <= 0) {
                    setNumOfDice(0);
                  } else setNumOfDice(+val);
                } else {
                  setNumOfDice(0);
                }
              }}
              defaultValue={numOfDice}
              max={100}
              min={0}
            />
            d
            <select onChange={(e) => setTypeOfDice(+e.currentTarget.value)} defaultValue={typeOfDice}>
              {mapDiceOptions()}
            </select>
          </div>
          <div>
            <button onClick={toggleEditMode}>Confirm</button>
          </div>
        </div>
      ) : (
        <p
          className='editableText'
          onClick={toggleEditMode}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') toggleEditMode();
          }}
        >
          {numOfDice && typeOfDice ? numOfDice + 'd' + typeOfDice : 'Click to set...'}
        </p>
      )}
    </div>
  );
};
