import {InputOption} from '../../helper/types';
import {Select} from '../inputs/select';

type CLHoursProps = {
  updateFormState: Function;
  chargeLogic?: string;
};

export const ChargeLogicHoursSelect: React.FC<CLHoursProps> = ({updateFormState, chargeLogic}: CLHoursProps) => {
  const label = chargeLogic === 'sunshine' ? 'Sunshine' : chargeLogic === 'nonpeak' ? 'Peak' : '';

  const defaultStart = chargeLogic === 'sunshine' ? '9' : chargeLogic === 'nonpeak' ? '18' : '';
  const defaultEnd = chargeLogic === 'sunshine' ? '16' : chargeLogic === 'nonpeak' ? '20' : '';

  function createOptions(): InputOption[] {
    const options = [
      '12:00 am',
      '1:00 am',
      '2:00 am',
      '3:00 am',
      '4:00 am',
      '5:00 am',
      '6:00 am',
      '7:00 am',
      '8:00 am',
      '9:00 am',
      '10:00 am',
      '11:00 am',
      '1:00 pm',
      '2:00 pm',
      '3:00 pm',
      '4:00 pm',
      '5:00 pm',
      '6:00 pm',
      '7:00 pm',
      '8:00 pm',
      '9:00 pm',
      '10:00 pm',
      '11:00 pm',
      '12:00 pm',
    ];

    return options.map((label, val) => {
      return {value: '' + val, label: label};
    });
  }

  return (
    <div className='column center'>
      <h2>Select {label} Times:</h2>
      <div className='row center'>
        <Select
          name={'chargingLogicStart'}
          updateState={updateFormState}
          options={createOptions()}
          label='Start:'
          defaultValue={defaultStart}
        />
        <Select
          name={'chargingLogicEnd'}
          updateState={updateFormState}
          options={createOptions()}
          label='End:'
          defaultValue={defaultEnd}
        />
      </div>
    </div>
  );
};
