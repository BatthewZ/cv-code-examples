import React, {useState} from 'react';
import {LoadingModal} from '../components/loadingModal';
import {Logo} from '../components/logo';
import {isLoggedIn} from '../helper/helpers';

import '../styles/loginPage.css';
import {Login} from './login';
import {Register} from './register';

type LandingPageProps = {
  login: Function;
};

export const LandingPage: React.FC<LandingPageProps> = ({login}: LandingPageProps) => {
  const [content, setContent] = useState(getLoginPage());
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState('');

  function getLoginPage() {
    return (
      <Login
        viewRegisterPage={viewRegisterPage}
        login={login}
        setModal={(setModal: boolean) => {
          const msg = setModal ? 'Logging In...' : '';
          setModalMsg(msg);
          setModalOpen(setModal);
        }}
      />
    );
  }

  function viewLoginPage() {
    setContent(getLoginPage());
  }

  function viewRegisterPage() {
    setContent(
      <Register
        viewLoginPage={viewLoginPage}
        setModal={(setModal: boolean) => {
          const msg = setModal ? 'Registering...' : '';
          setModalMsg(msg);
          setModalOpen(setModal);
        }}
      />
    );
  }

  // if (isLoggedIn()) login();

  return (
    <div className='loginPage'>
      <LoadingModal message={modalMsg} isActive={modalOpen} />
      <div className='row'>
        <div className='panel bgPanel'>
          <div className='panelInner'>
            <Logo fontSize='3.3em' />
            <div className='darkBlurb'>
              <p>
                Knowledge is power, and sharing is caring! Create music lessons with ease and share them with peers and
                students, or simply browse the lessons created by teachers from around the world. LessonBuilder is a hub
                of knowledge for the musically inclined.
              </p>
            </div>
            <div className='row centerChildren'>
              <div className='darkLinkText'>Contact Us</div> <div>|</div> <div className='darkLinkText'>Our Goal</div>
            </div>
          </div>
        </div>
        <div className='panel'>{content}</div>
      </div>
    </div>
  );
};
