import {InputProps, RadioOptions} from '../../helper/types';

type RadioProps = InputProps & RadioOptions;

export const RadioButtons: React.FC<RadioProps> = ({
  name,
  tooltip,
  label,
  defaultValue,
  options,
  updateState,
  blurb,
}: RadioProps) => {
  function mapButtons() {
    return options.map((option) => {
      const id = 'radio-' + name + '-' + option.value;
      return (
        <div key={id}>
          <input
            type='radio'
            id={id}
            name={name}
            value={option.value}
            defaultChecked={defaultValue === option.value}
            onClick={() => {
              if (option.onClick) option.onClick();
              updateState(name, option.value);
            }}
          />
          <label
            htmlFor={id}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                if (option.onClick) option.onClick();
                updateState(name, option.value);
              }
            }}
          >
            {option.label ?? option.value}
          </label>
        </div>
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
      <div className='inputRow extraTopMargin extraBottomMargin'>{mapButtons()}</div>
      {/* <div className='inputRow'>{mapButtons()}</div> */}
      <span id={'errMsg-' + name} className='errMsg'></span>
    </div>
  );
};
