type SOCRangeProps = {
  updateState: Function;
  defaultMin: number | string;
  defaultMax: number | string;
  tooltip?: JSX.Element | undefined;
};

export const SOCRange: React.FC<SOCRangeProps> = ({defaultMin, defaultMax, tooltip, updateState}: SOCRangeProps) => {
  return (
    <div id={'socRange-InputContainer'} className='inputContainer fadeInOnLoad'>
      <div className='row center'>
        <h2>Allowable Battery State of Charge Range</h2>
        {tooltip}
      </div>
      <div>
        <p>
          <br />
          Nominate the desired minimum and maximum battery state of charge (SOC) that the vehicle can operate within.
          The vehicle is triggered to return to the depot to charge when the minimum SOC threshold is reached, and
          vehicles will charge up to the maximum SOC.
        </p>
        <br />
      </div>
      <div className='inputRow'>
        <strong>Min:</strong>
        <input
          type='number'
          name={'socMin'}
          id={'socMin-numberInput'}
          defaultValue={defaultMin}
          onChange={(e) => updateState('socMin', e.currentTarget.value)}
          step={0.01}
          min={0}
        />
        <strong>Max:</strong>
        <input
          type='number'
          name={'socMax'}
          id={'socMax-numberInput'}
          defaultValue={defaultMax}
          onChange={(e) => updateState('socMax', e.currentTarget.value)}
          step={0.01}
          min={0}
        />
      </div>
      <span id={'errMsg-' + 'socRange'} className='errMsg'></span>
    </div>
  );
};
