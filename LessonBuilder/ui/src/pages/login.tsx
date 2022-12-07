import React, {useState} from 'react';
import {apiCall} from '../apiCalls/apiCalls';
import {TextInput} from '../components/TextInput';
import {clearErrorMessages, setErrorMessage} from '../helper/setErrorMsg';

type PageProps = {
  viewRegisterPage: Function;
  setModal: Function;
  login: Function;
};

export const Login: React.FC<PageProps> = ({viewRegisterPage, setModal, login}: PageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function fieldsAreValid() {
    clearErrorMessages(['email', 'password']);
    let isValid = true;
    if (!email || !email.match(/^[a-zA-Z0-9_\.]+@[a-zA-Z0-9]+\.([a-zA-Z0-9]{2,3}\.?)+$/)) {
      setErrorMessage('email', 'Please enter a valid email');
      isValid = false;
    }
    if (!password) {
      setErrorMessage('password', 'Please enter a valid password');
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
    return isValid;
  }

  function viewState() {
    console.log(email);
    console.log(password);
  }

  async function submit() {
    if (!fieldsAreValid()) return;

    setModal(true);
    const response = await apiCall.login({email: email, password: password});

    if (response.errMsg) {
      setErrorMessage('password', response.errMsg);
      setModal(false);
      return;
    }

    if (response.success) {
      sessionStorage.setItem('lessonbuilder', JSON.stringify({username: response.username, email: response.email}));
      setModal(false);
      login();
      return;
    }
    setModal(false);
    setErrorMessage('password', 'Something went wrong trying to contact the server. Please contact an admin.');
  }

  return (
    <div className='panelInner fadeInOnLoad'>
      <TextInput type='text' name='email' label='Email' placeholder='Email' updateState={setEmail} />
      <TextInput type='password' name='password' label='Password' placeholder='Password' updateState={setPassword} />
      <p
        className='linkText'
        onClick={() => {
          viewRegisterPage();
        }}
      >
        Don't have an account? Click here to register!
      </p>
      <button className='btn btn-light' onClick={() => submit()}>
        Login
      </button>
    </div>
  );
};
