import {WeaponType} from '../../../types/types';
import {Weapon} from './weapon';

type MappedWeaponsProps = {
  weapons: WeaponType[];
  refreshWeaponsArray: Function;
  getAttributeState: Function;
  deleteWeapon: Function;
  setDiceModal: Function;
};

export const MappedWeapons: React.FC<MappedWeaponsProps> = ({
  weapons,
  getAttributeState,
  refreshWeaponsArray,
  deleteWeapon,
  setDiceModal,
}: MappedWeaponsProps) => {
  function mapWeapons() {
    return weapons.map((weapon) => {
      return (
        <Weapon
          key={weapon.id}
          weapon={weapon}
          changeAttribute={() => {}}
          deleteWeapon={deleteWeapon}
          attributeModifer={+getAttributeState(weapon.attribute)}
          refreshWeaponsView={refreshWeaponsArray}
          setDiceModal={setDiceModal}
        />
      );
    });
  }
  return <div className='rowWrap spaceEvenly'>{mapWeapons()}</div>;
};
