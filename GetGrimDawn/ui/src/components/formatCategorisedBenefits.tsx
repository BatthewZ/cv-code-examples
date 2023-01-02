import {CategorisedBenefits, ReducedBenefit} from '../types/types';
import {formatBenefit} from '../formatters/formatBenefit';

type FBProps = {
  cbs: CategorisedBenefits;
};

export const FormattedBenefits: React.FC<FBProps> = ({cbs}) => {
  function mapBenefits(array: ReducedBenefit[], title: string) {
    if (!array || !array.length) return <></>;

    return (
      <div>
        <strong>{title}</strong>
        <br />
        {array.map((benefit) => {
          // console.log(formatBenefit(benefit));
          return (
            <>
              {formatBenefit(benefit)}
              <br />
            </>
          );
        })}
        <br />
      </div>
    );
  }

  function sortDmg() {
    const retDmg = [...cbs.damage].filter((dmg) => dmg.damageType?.includes('Retaliation'));
    const normalDmg = [...cbs.damage].filter((dmg) => !dmg.damageType?.includes('Retaliation'));
    return [...normalDmg, ...retDmg];
  }

  return (
    <div>
      {mapBenefits(cbs.oaDaCrit, 'OA, DA and Crit Damage')}
      {mapBenefits(sortDmg(), 'Damage')}
      {mapBenefits(cbs.healAndHealth, 'Healing and Health')}
      {mapBenefits(cbs.defensive, 'Defensive Buffs')}
      {mapBenefits(cbs.speed, 'Speed Buffs')}
      {mapBenefits(cbs.debuffs, 'Other Debuffs')}
    </div>
  );
};
