import {useState} from 'react';

type RadioButton = {
  onClick: Function;
  value: string;
};

type RadioButtonsProps = {
  radioButtons: RadioButton[];
  name: string;
};

export const RadioButtons: React.FC<RadioButtonsProps> = ({name, radioButtons}: RadioButtonsProps) => {
  const [checkedId, setCheckedId] = useState('');
  function mapRadios() {
    return radioButtons.map((button) => {
      const id = name + '-' + button.value;
      return (
        <>
          <input
            type='radio'
            id={id}
            name={name}
            value={button.value}
            onClick={() => {
              button.onClick();
              setCheckedId(id);
            }}
            checked={checkedId === id}
            key={id + 'Input'}
          />
          <label
            htmlFor={id}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                button.onClick();
                setCheckedId(id);
              }
            }}
          >
            <h3>{button.value}</h3>
          </label>
        </>
      );
    });
  }
  return <div className='rowWrap centerChildren'>{mapRadios()}</div>;
};
