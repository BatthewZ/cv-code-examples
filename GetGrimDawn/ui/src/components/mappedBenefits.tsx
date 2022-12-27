import {formatBenefit} from '../formatters/formatBenefit';
import {ReducedBenefit} from '../types/types';

type MBProps = {
  benefits: ReducedBenefit[];
  title: string;
};

export const MapBenefits: React.FC<MBProps> = ({benefits, title = ''}) => {
  if (!benefits.length) return <></>;

  return (
    <div>
      {title.length ? <h3>{title}</h3> : ''}
      {benefits.map((benefit) => (
        <>{formatBenefit(benefit)}</>
      ))}
    </div>
  );
};
