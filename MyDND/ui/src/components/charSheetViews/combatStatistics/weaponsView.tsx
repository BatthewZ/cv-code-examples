import {WeaponType} from '../../../types/types';
import {MappedWeapons} from './mappedWeapons';

type ViewProps = {
  weapons: WeaponType[];
  refreshWeaponsArray: Function;
  getAttributeState: Function;
  deleteWeapon: Function;
  addWeapon: Function;
};

export const WeaponsView: React.FC<ViewProps> = () => {
  //   weapons,
  //   refreshWeaponsArray,
  //   getAttributeState,
  //   deleteWeapon,
  //   addWeapon,
  // }: ViewProps) => {
  //   return (
  //     <fieldset className='column centerChildren spaceEvenly fadeInOnLoad'>
  //       <p>
  //         <strong>Weapons:</strong>
  //       </p>
  //       <MappedWeapons
  //         weapons={weapons}
  //         refreshWeaponsArray={refreshWeaponsArray}
  //         getAttributeState={getAttributeState}
  //         deleteWeapon={deleteWeapon}
  //       />

  //       <p>
  //         <button onClick={() => addWeapon()}>Add Weapon</button>
  //       </p>
  //     </fieldset>
  //   );
  return <div></div>;
};
