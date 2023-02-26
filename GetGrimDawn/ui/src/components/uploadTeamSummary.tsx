import {useState} from 'react';
import {Character} from '../types/types';

type UTSProps = {
  setCharacters: Function;
};

export const UploadTeamSummary: React.FC<UTSProps> = ({setCharacters}) => {
  const [errMsg, setErrMsg] = useState('');

  function charsAreValid(characters: Character[]) {
    characters.forEach((char) => {
      if (!char.classNames || !char.classNames.length || !char.classNames[0]) return false;
      if (!char.classes || !char.classes.length) return false;
      if (!char.attributes) return false;
      if (!char.url) return false;
      if (!char.teamSkills) return false;
    });
    return true;
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    setErrMsg('');
    const file = e.target.files && e.target.files.length ? e.target.files[0] : null;
    if (!file) return;
    if (!file.name.includes('.txt')) return setErrMsg('Invalid filetype!');

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = reader.result?.toString();
        if (!text) {
          return setErrMsg('Error reading uploaded file. Please check the file and try again.');
        }
        const characters: Character[] = JSON.parse(text);
        if (charsAreValid(characters)) {
          return setCharacters(characters);
        }
        setErrMsg('Characters were invalid. Please check the file and try again.');
      } catch (e) {
        if (!errMsg.length)
          setErrMsg(
            'Something went wrong trying to read the characters from file. Please check the file and try again.'
          );
      }
    };
    reader.readAsText(file);
  }

  return (
    <div>
      <div className='center row'>
        <label htmlFor='fileUpload'>
          <div className='button'>Upload Team Summary From File</div>
        </label>
      </div>
      <input type='file' id='fileUpload' onChange={handleFile} accept='.txt' style={{display: 'none'}} />

      <span className='errMsg'>{errMsg}</span>
    </div>
  );
};
