import {useState} from 'react';
import {register} from '../apiCalls/apiCalls';
import {TextInput} from '../components/inputs/TextInput';
import {LoadingModal} from '../components/miscUI/loadingModal';
import {clearErrorMessages, setErrorMessage} from '../helper/setErrorMsg';

type RegisterProps = {
  goBack: Function;
  onSuccess: Function;
};

export const Register: React.FC<RegisterProps> = ({goBack, onSuccess}) => {
  const [username, setUsername] = useState('');
  const [adminRegisterkey, setAdminregisterkey] = useState('');
  const [password, setPassword] = useState('');
  const [repeatpassword, setRepeatpassword] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function fieldsAreValid() {
    clearErrorMessages(['username', 'adminRegisterkey', 'password', 'repeatpassword']);
    let isValid = true;
    if (!username) {
      setErrorMessage('username', 'Please enter a valid username');
      isValid = false;
    }
    if (!adminRegisterkey) {
      setErrorMessage('adminRegisterkey', 'Please enter an admin key!');
      isValid = false;
    }
    if (!password) {
      setErrorMessage('password', 'Please enter a valid password');
      isValid = false;
    }
    if (!repeatpassword) {
      setErrorMessage('repeatpassword', 'Please enter a valid repeat password');
      isValid = false;
    }
    if (username.length > 50) {
      setErrorMessage('username', 'username cannot be more than 50 characters long');
      isValid = false;
    }
    if (adminRegisterkey.length > 50) {
      setErrorMessage('adminRegisterkey', 'admin Register key cannot be more than 50 characters long');
      isValid = false;
    }
    if (password.length > 50) {
      setErrorMessage('password', 'password cannot be more than 50 characters long');
      isValid = false;
    }
    if (repeatpassword.length > 50) {
      setErrorMessage('repeatpassword', 'repeat password cannot be more than 50 characters long');
      isValid = false;
    }
    return isValid;
  }

  function submit() {
    if (!fieldsAreValid()) return;
    setModalIsOpen(true);

    register(username, password, adminRegisterkey).then((response) => {
      if (response.errMsg) {
        return setErrorMessage('repeatpassword', response.errMsg);
      }
      if (response.success) {
        goBack();
      }
    });
    setModalIsOpen(false);
  }

  return (
    <div className='centerScreen fadeInOnLoad'>
      <LoadingModal content={<h1>Registering...</h1>} isActive={modalIsOpen} />
      <div>
        <TextInput type='text' name='username' label='Username' placeholder='Username' updateState={setUsername} />
        <TextInput
          type='password'
          name='adminRegisterkey'
          label='Admin Register Key'
          updateState={setAdminregisterkey}
        />
        <TextInput type='password' name='password' label='Password' placeholder='Password' updateState={setPassword} />
        <TextInput
          type='password'
          name='repeatpassword'
          label='Repeat Password'
          placeholder='Repeat Password'
          updateState={setRepeatpassword}
        />
        <p></p>
        <button onClick={submit}>Register</button>
        <button onClick={() => goBack()}>Go Back</button>
      </div>
    </div>
  );
};
