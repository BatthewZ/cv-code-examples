import React, {useState} from 'react';
import {API_URL} from '../helpers/apiUrl';
import {prepareTeamSkills} from '../helpers/prepareTeamSkills';
import {Character, Item} from '../types/types';

type GCIProps = {
  addCharacter: (char: Character) => void;
  numOfChars: number;
};

export const GetCharacterInput: React.FC<GCIProps> = ({addCharacter, numOfChars}) => {
  const [charUrl, setCharUrl] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [loadingMsg, setLoadingMsg] = useState(<></>);
  const [loadButtonStyle, setLoadButtonStyle] = useState<React.CSSProperties>();

  if (numOfChars >= 4) return <>You can only load a maximum of 4 characters.</>;

  function validateUrl() {
    setErrMsg('');
    let isValid = true;
    if (!charUrl.match(/^(https:\/\/www\.grimtools\.com\/calc\/).*$/)) {
      setErrMsg('Invalid URL. The URL should look something like this: https://www.grimtools.com/calc/wV1n5GwZ');
      isValid = false;
    }
    return isValid;
  }

  async function fetchChar() {
    if (!validateUrl()) return;

    // localhost:8080/loadchar?charURL=https://www.grimtools.com/calc/wV1n5GwZ'
    setLoadButtonStyle({display: 'none'});
    setLoadingMsg(<>Loading Character (this can take a minute)...</>);
    try {
      const response = await (await fetch(API_URL + 'loadchar?charURL=' + charUrl)).json();
      setLoadButtonStyle({display: 'block'});
      setLoadingMsg(<></>);

      if (response.errMsg) return setErrMsg(response.errMsg);

      // Filter out "weapon2" and "weapon2alt" if weapon1 or weapon1alt is a two-handed weapon.
      const weapon1 = response.items.find((item: Item) => item.slot === 'weapon1');
      const weapon1alt = response.items.find((item: Item) => item.slot === 'weapon1alt');
      if (weapon1 && weapon1.details.includes('Two-Handed'))
        response.items = response.items.filter((item: Item) => item.slot !== 'weapon2');
      if (weapon1alt && weapon1alt.details.includes('Two-Handed'))
        response.items = response.items.filter((item: any) => item.slot !== 'weapon2alt');

      // Prepare character
      const classNames = response.classes.map((cl: any) => cl.name);
      const char = prepareTeamSkills(response);
      char.classNames = classNames;

      if (!char)
        return setErrMsg('Something went wrong; We could not load the character. The program might be broken.');
      addCharacter(char);

      setCharUrl('');
      const element = document.getElementById('urlInput') as HTMLInputElement;
      if (element) element.value = '';
    } catch (e) {
      setLoadButtonStyle({display: 'block'});
      setLoadingMsg(<></>);
      setErrMsg('Something went wrong loading the character. Please wait a moment and try again.');
    }
  }

  return (
    <div>
      <div className='column center centerChildren'>
        <h2>Input Grimtools Character URL</h2>
        <input
          onChange={(e) => {
            setCharUrl(e.target.value);
          }}
          className='getCharInput'
          id='urlInput'
          placeholder='eg: https://www.grimtools.com/calc/eVLMDlLZ'
        />

        <div className='errMsg'>{errMsg}</div>
        <div>
          <button style={loadButtonStyle} onClick={fetchChar}>
            Load Character
          </button>
          {errMsg ? <button onClick={() => setErrMsg('')}>Clear Errors</button> : ''}
        </div>
      </div>
      {loadingMsg}
    </div>
  );
};
