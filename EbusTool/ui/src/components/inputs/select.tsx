import {InputOptions, InputProps} from '../../helper/types';

export type SelectProps = InputProps & InputOptions;

export const Select: React.FC<SelectProps> = ({
  name,
  tooltip,
  label,
  defaultValue,
  options,
  updateState,
  blurb,
}: SelectProps) => {
  function mapOptions() {
    return options.map((option) => {
      return (
        <option value={option.value} key={option.value + '-selectOption'}>
          {option.label ?? option.value}
        </option>
      );
    });
  }
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
        <select
          id={name + '-select'}
          name={name}
          onChange={(e) => {
            updateState(name, e.target.value);
          }}
          defaultValue={defaultValue}
        >
          <option value=''>Please select...</option>
          {mapOptions()}
        </select>
      </div>
      <span id={'errMsg-' + name} className='errMsg'></span>
    </div>
  );
};
