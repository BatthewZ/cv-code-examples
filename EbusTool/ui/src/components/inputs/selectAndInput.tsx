import {useState} from 'react';
import {isCharacteristicsFormKey} from '../../formstate/characteristics_formstate';
import {isScenarioFormKey} from '../../formstate/scenario_formstate';
import {InputOptions, InputProps, NumberInputProps} from '../../helper/types';
import {setAlphaNumericInputValue, setSelectValue} from '../../helper/uiHelpers';
import {NumberInput} from './numberInput';
import {Select} from './select';

type SelectAndInputProps = NumberInputProps &
  InputOptions & {
    style?: React.CSSProperties;
  };

export const SelectAndInput: React.FC<SelectAndInputProps> = ({
  name,
  tooltip,
  label,
  defaultValue,
  updateState,
  min,
  max,
  step,
  placeholder,
  options,
  unitsOfMeasurement,
  style,
  blurb,
}: SelectAndInputProps) => {
  const [value, setValue] = useState('');

  // if (defaultValue) {
  // This was causing a loop issue on render.
  //   updateState(name, defaultValue);
  // }

  if (!isCharacteristicsFormKey(name) && !isScenarioFormKey(name)) {
    return <h2>Dev Error: {name} is not a valid formState type.</h2>;
  }

  function resetSelectAndUpdateState(name: string, value: string) {
    setValue(value);
    setSelectValue(name + '-select', '');
    updateState(name, value);
  }

  function resetNumberInputAndUpdateState(name: string, value: string) {
    setAlphaNumericInputValue(name + '-numberInput', '');
    setValue(value);
    updateState(name, value);
  }

  function mapOptions() {
    return options.map((option) => {
      return (
        <option value={option.value} key={option.value + '-selectOption'}>
          {option.label ?? option.value}
        </option>
      );
    });
  }

  // console.log(name + ':', defaultValue);
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
      <p>Either select a preset from the dropdown, or input a custom value.</p>
      <div className='inputRow'>
        <select
          id={name + '-select'}
          name={name}
          onChange={(e) => {
            resetNumberInputAndUpdateState(name, e.target.value);
          }}
          defaultValue={defaultValue}
        >
          <option value=''>Please select...</option>
          {mapOptions()}
        </select>
        <input
          type='number'
          name={name}
          id={name + '-numberInput'}
          // defaultValue={defaultValue}
          onChange={(e) => resetSelectAndUpdateState(name, e.currentTarget.value)}
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
