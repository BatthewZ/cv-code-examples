import {ScenarioFormState} from '../../formstate/scenario_formstate';
import {capitalizeFirstLetter} from '../../helper/stringFormatters';
import {DataForCharFormView} from '../../helper/types';

type CharBlurbProps = {
  data: DataForCharFormView;
};

export const CharacteristicsMainBlurb: React.FC<CharBlurbProps> = (blurbProps: CharBlurbProps) => {
  return (
    <div className='blurb'>
      <hr />
      <h1>Selected Transit Input Data</h1>
      <p>
        <strong>GTFS Input: </strong>
        {capitalizeFirstLetter(blurbProps.data.selectedInput)}
        <br />
        <strong>Agency: </strong>
        {blurbProps.data.agencyName}
        <br />
        <strong>Vehicle Type: </strong>
        {capitalizeFirstLetter(blurbProps.data.vehicleType)}
        <br />
      </p>
      <hr />
    </div>
  );
};
