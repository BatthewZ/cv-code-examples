import {rollD20} from '../../helper/rollD20';
import {DiceRollView} from './diceRollView';

type AttributeProps = {
  modifier?: number;
  setDiceModal: Function;
  totalMsg?: string;
  calculationMsg?: string;
};

export const RollButton: React.FC<AttributeProps> = ({setDiceModal, modifier, totalMsg, calculationMsg}) => {
  function rollDice() {
    const roll = rollD20(modifier);
    setDiceModal(
      true,
      <DiceRollView
        diceRoll={{
          log: `Roll: ${roll.roll}\nModifier: ${roll.modifier}`,
          total: roll.total,
        }}
        totalMsg={totalMsg}
        calculationMsg={calculationMsg}
      />
    );
  }
  return <button onClick={rollDice}>Roll</button>;
};
