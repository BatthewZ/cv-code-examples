import {DiceRoll} from '../../helper/rollDamage';

type DiceRollProps = {
  diceRoll: DiceRoll;
  totalMsg?: string;
  calculationMsg?: string;
};

export const DiceRollView: React.FC<DiceRollProps> = ({
  diceRoll,
  totalMsg = 'Total Damage',
  calculationMsg = 'Damage Calculation',
}: DiceRollProps) => {
  function formatDmgLog() {
    return diceRoll.log.split('\n').map((row) => <p>{row}</p>);
  }
  return (
    <div className='modalBlurb'>
      <div className='row centerChildren'>
        <h2>
          {totalMsg}: {diceRoll.total}
        </h2>
      </div>
      <div className='modalBlurbContent'>
        <h3>{calculationMsg}:</h3>
        {formatDmgLog()}
      </div>
    </div>
  );
};
