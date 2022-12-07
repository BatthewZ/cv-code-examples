import {useState} from 'react';
import {rollDamage} from '../../../helper/rollDamage';
import {DiceType} from '../../../types/types';

export const DiceView: React.FC = () => {
  const [numOfDice, setNumOfDice] = useState(1);
  const [diceType, setDiceType] = useState<DiceType>(6);

  function updateNumOfDice(num: number) {
    const input = document.getElementById('numOfDice-Input') as HTMLInputElement;
    setNumOfDice(num);
    if (input) {
      input.value = num + '';
    }
  }

  function getNumButtons() {
    const buttons = [];
    for (let i = 1; i < 11; i++) {
      buttons.push(
        <button key={i + '-diceNum-key'} onClick={() => updateNumOfDice(i)}>
          {i}
        </button>
      );
    }
    return buttons;
  }

  function getDiceTypeButtons() {
    const diceTypes: DiceType[] = [2, 4, 6, 8, 10, 12, 20];
    return diceTypes.map((dice) => {
      const id = dice + '-diceType-key';
      return (
        <>
          <input
            id={id}
            key={id}
            type='radio'
            value={'d' + dice}
            name='diceButtons'
            onClick={() => {
              setDiceType(dice);
            }}
            defaultChecked={dice === 6}
          />
          <label htmlFor={id}>d{dice}</label>
        </>
      );
    });
  }

  return (
    <div className='diceView fadeInOnLoad'>
      <h3>Number of Dice:</h3>
      <div className='rowWrap centerChildren'>{getNumButtons()}</div>
      <p></p>
      <input
        id='numOfDice-Input'
        defaultValue={numOfDice ?? '1'}
        type='number'
        onChange={(e) => {
          const val = e.currentTarget.value;
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
      />
      <h3>Dice Type</h3>
      <div className='rowWrap centerChildren'>{getDiceTypeButtons()}</div>
      <p></p>
      <button onClick={() => alert(rollDamage(numOfDice, diceType).log)}>Roll</button>
    </div>
  );
};
