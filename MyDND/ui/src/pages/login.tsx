import {useState} from 'react';
import {login} from '../apiCalls/apiCalls';
import {TextInput} from '../components/inputs/TextInput';
import {LoadingModal} from '../components/miscUI/loadingModal';
import {clearErrorMessages, setErrorMessage} from '../helper/setErrorMsg';

type LoginProps = {
  toRegister: Function;
  onSuccess: Function;
};

export const Login: React.FC<LoginProps> = ({toRegister, onSuccess}: LoginProps) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function fieldsAreValid() {
    clearErrorMessages(['userName', 'password']);
    let isValid = true;
    if (!userName) {
      setErrorMessage('userName', 'Please enter a valid user name');
      isValid = false;
    }
    if (!password) {
      setErrorMessage('password', 'Please enter a valid password');
      isValid = false;
    }
    if (userName.length > 50) {
      setErrorMessage('userName', 'userName cannot be more than 50 characters long');
      isValid = false;
    }
    if (password.length > 50) {
      setErrorMessage('password', 'password cannot be more than 50 characters long');
      isValid = false;
    }
    return isValid;
  }

  function onSubmit() {
    if (!fieldsAreValid()) return;
    setModalIsOpen(true);
    login(userName, password).then((response) => {
      if (response.errMsg) {
        setErrorMessage('password', response.errMsg);
      } else if (response.success) {
        sessionStorage.setItem('user', userName);
        onSuccess();
      }
      setModalIsOpen(false);
    });
  }

  if (sessionStorage.getItem('user')) onSuccess();

  return (
    <div className='centerScreen fadeInOnLoad'>
      <LoadingModal content={<h1>Logging In...</h1>} isActive={modalIsOpen} />
      <div>
        <TextInput type='text' name='userName' label='User' placeholder='Username' updateState={setUserName} />
        <TextInput type='password' name='password' label='Password' placeholder='Password' updateState={setPassword} />
        <p></p>
        <button
          onClick={() => {
            onSubmit();
          }}
        >
          Login
        </button>
        <button onClick={() => toRegister()}>Register</button>
      </div>
    </div>
  );
};
