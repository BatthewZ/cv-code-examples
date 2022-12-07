import {useState} from 'react';
// import {API_URL} from '../../API_URL';
import {clearErrorMessages, setErrorMessage} from '../helper/setErrorMsg';
import {TextInput} from '../components/TextInput';
import {apiCall} from '../apiCalls/apiCalls';

type PageProps = {
  viewLoginPage: Function;
  setModal: Function;
};

export const Register: React.FC<PageProps> = ({viewLoginPage, setModal}: PageProps) => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  function fieldsAreValid() {
    clearErrorMessages(['username', 'email', 'password', 'repeatPassword']);
    let isValid = true;
    if (!username) {
      setErrorMessage('username', 'Please enter a valid username');
      isValid = false;
    }

    if (!email || !email.match(/^[a-zA-Z0-9_\.]+@[a-zA-Z0-9]+\.([a-zA-Z0-9]{2,3}\.?)+$/)) {
      setErrorMessage('email', 'Please enter a valid email');
      isValid = false;
    }

    if (password !== repeatPassword) {
      setErrorMessage('repeatPassword', 'Your passwords do not match!');
      return false;
    }

    if (!password) {
      setErrorMessage('password', 'Please enter a valid Password');
      isValid = false;
    }
    if (!repeatPassword) {
      setErrorMessage('repeatPassword', 'Please enter a valid Repeat Password');
      isValid = false;
    }

    if (username.length > 50) {
      setErrorMessage('username', 'username cannot be more than 50 characters long');
      isValid = false;
    }
    if (email.length > 50) {
      setErrorMessage('email', 'email cannot be more than 50 characters long');
      isValid = false;
    }
    if (password.length > 50) {
      setErrorMessage('password', 'password cannot be more than 50 characters long');
      isValid = false;
    }

    if (!email.match(/^[0-9a-zA-Z_\.]*@[0-9a-zA-Z_\.]+\.[a-zA-Z_\.]{2,3}$/)) {
      setErrorMessage('email', 'Please enter a valid email');
      isValid = false;
    }

    return isValid;
  }

  async function submit() {
    if (!fieldsAreValid()) return;
    setModal(true);
    const response = await apiCall.register({username: username, email: email, password: password});
    if (response.errMsg) {
      setErrorMessage('repeatPassword', response.errMsg);
      setModal(false);
      return;
    }
    console.log(response);
    if (response.success) {
      setModal(false);
      viewLoginPage();
      return;
    }
    setModal(false);
    setErrorMessage(
      'repeatPassword',
      'Something went wrong while trying to contact the server. Please contact an admin.'
    );
  }

  return (
    <div className='panelInner fadeInOnLoad'>
      <TextInput name='username' label='Username' updateState={setUserName} />
      <TextInput type='email' name='email' label='Email' placeholder='your@email.com' updateState={setEmail} />
      <TextInput type='password' name='password' label='Password' updateState={setPassword} />
      <TextInput
        type='password'
        name='repeatPassword'
        label='Repeat Password'
        placeholder='Repeat Password'
        updateState={setRepeatPassword}
      />
      <div className='row centerChildren'>
        <button className='btn' onClick={() => submit()}>
          Submit
        </button>
        <button
          className='btn'
          onClick={() => {
            viewLoginPage();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
