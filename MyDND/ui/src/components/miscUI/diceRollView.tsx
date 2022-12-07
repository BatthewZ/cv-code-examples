import {DamageRoll} from '../../helper/rollDamage';

type DiceRollProps = {
  dmgRoll: DamageRoll;
};

export const DiceRollView: React.FC<DiceRollProps> = ({dmgRoll}: DiceRollProps) => {
  function formatDmgLog() {
    return dmgRoll.log.split('\n').map((row) => <p>{row}</p>);
  }
  return (
    <div className='modalBlurb'>
      <div className='row centerChildren'>
        <h2>Total Damage: {dmgRoll.dmg}</h2>
      </div>
      <div className='modalBlurbContent'>
        <h3>Damage Calculation:</h3>
        {formatDmgLog()}
      </div>
    </div>
  );
};
