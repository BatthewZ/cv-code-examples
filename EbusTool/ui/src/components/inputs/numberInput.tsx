import {InputProps, NumberInputProps} from '../../helper/types';

export const NumberInput: React.FC<NumberInputProps> = ({
  name,
  tooltip,
  label,
  defaultValue,
  updateState,
  min,
  max,
  step,
  placeholder,
  blurb,
  unitsOfMeasurement,
}: NumberInputProps) => {
  return (
    <div id={name + '-InputContainer'} className='inputContainer fadeInOnLoad'>
      <div className='row center'>
        <h2>{label ?? name.toUpperCase()}</h2>
        {tooltip}
      </div>
      {blurb ? (
        <div>
          <p>
            <br />
            {blurb}
          </p>
          <br />
        </div>
      ) : (
        ''
      )}
      <div className='inputRow'>
        <input
          className='numberInput'
          type='number'
          name={name}
          id={name + '-numberInput'}
          defaultValue={defaultValue}
          onChange={(e) => updateState(name, e.currentTarget.value)}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
        />
        {unitsOfMeasurement}
      </div>
      <span id={'errMsg-' + name} className='errMsg'></span>
    </div>
  );
};
