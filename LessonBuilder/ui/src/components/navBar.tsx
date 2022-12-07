import React from 'react';
// import '../styles/navRadios.css';

type NavBarProps = {
  name: string;
  radioButtons: RadioProps[];
};

type RadioProps = {
  value: string;
  onClick: Function;
  label?: string;
};

export const NavBar: React.FC<NavBarProps> = ({name, radioButtons}: NavBarProps) => {
  function mapRadioButtons() {
    return radioButtons.map((radioButton) => {
      const id = 'radio-' + radioButton.value;
      return (
        <>
          <input className='navLink' type='radio' name={name} value={radioButton.value} id={id} />
          <label
            htmlFor={id}
            onClick={() => {
              radioButton.onClick();
            }}
          >
            {radioButton.label ?? radioButton.value}
          </label>
        </>
      );
    });
  }

  return (
    <>
      <div className='navBar'>
        <div className='column'>{mapRadioButtons()}</div>
        {/* <hr /> */}
      </div>
    </>
  );
};
