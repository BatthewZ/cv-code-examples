import {AttackOrSpellType} from '../../../types/types';
import {AttackOrSpell} from './attackOrSpell';

type MappedAttacksProps = {
  attacksOrSpells: AttackOrSpellType[];
  refreshView: Function;
  deleteAttack: Function;
  setDiceModal: Function;
};

export const MappedAttacksOrSpells: React.FC<MappedAttacksProps> = ({
  attacksOrSpells,
  refreshView,
  deleteAttack,
  setDiceModal,
}: MappedAttacksProps) => {
  function mapAttacks() {
    return attacksOrSpells.map((attack) => {
      return (
        <AttackOrSpell
          key={attack.id}
          refreshAttacksView={refreshView}
          deleteItem={deleteAttack}
          attackOrSpell={attack}
          setDiceModal={setDiceModal}
        />
      );
    });
  }
  return <div className='rowWrap spaceEvenly'>{mapAttacks()}</div>;
};
