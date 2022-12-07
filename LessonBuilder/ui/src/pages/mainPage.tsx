import React, {useState} from 'react';
import {apiCall} from '../apiCalls/apiCalls';
import {LessonReader} from '../components/lessonReader';
import {LoadingModal} from '../components/loadingModal';
import {Logo} from '../components/logo';
import {NavBar} from '../components/navBar';
import {TestingUpload} from '../components/testingUpload';
import {HarmonyLessonDemo} from '../helper/demoLessons';
import {getUserName} from '../helper/helpers';
import {Lesson} from '../helper/types';
import '../styles/main.css';
import '../styles/navRadios.css';
import {CreateLesson} from './createLesson';
import {ProfilePage} from './profile';
import {ViewLessons} from './viewLessons';

type MainPageProps = {
  logout: Function;
};

export const MainPage: React.FC<MainPageProps> = ({logout}: MainPageProps) => {
  const [userName, setUserName] = useState(getUserName() ?? '!');
  const [title, setTitle] = useState<string>('Your Profile');
  const [content, setContent] = useState(<ProfilePage setModal={setModal} />);
  const [goBack, setGoBack] = useState(<></>);
  const [modalMsg, setModalMsg] = useState('');
  const [modalIsActive, setModalIsActive] = useState(false);
  const [modalCloseButton, setModalCloseButton] = useState(false);

  function viewCreateLesson() {
    setTitle('Create Lesson');
    setContent(<CreateLesson setModal={setModal} setMainPageTitle={setMainPageTitle} createOrUpdate='create' />);
    setGoBack(<></>);
  }

  function viewViewLessons() {
    setTitle('Browse Lessons');
    setContent(<ViewLessons viewLesson={viewLesson} />);
    setGoBack(<></>);
  }

  function viewProfile() {
    setTitle('Your Profile');
    setContent(<ProfilePage setModal={setModal} />);
    setGoBack(<></>);
  }

  function viewLesson(lesson: Lesson) {
    setTitle('View Lesson');
    setContent(<LessonReader urlIsLive={true} lesson={lesson} />);
    setGoBack(
      <div className='linkText' onClick={viewViewLessons}>
        Back To Lessons
      </div>
    );
  }

  function setMainPageTitle(title: string) {
    setTitle(title);
  }

  function setModal(msg: string, isActive: boolean, modalCloseButton = false) {
    setModalMsg(msg);
    setModalIsActive(isActive);
    setModalCloseButton(modalCloseButton);
  }

  function viewTestingSpace() {}

  return (
    <div className='mainPage fadeInOnLoad'>
      <LoadingModal message={modalMsg} isActive={modalIsActive} closeButton={modalCloseButton} />
      {/* <div className='navBar'>Hi</div> */}
      <div className='navHeader'>
        <Logo fontSize='2em' />
        <div className='userName'>Welcome back {userName}!</div>
        <NavBar
          name={'navOptions'}
          radioButtons={[
            {value: 'Create Lesson', onClick: viewCreateLesson},
            {value: 'View Lessons', onClick: viewViewLessons},
            {value: 'Your Profile', onClick: viewProfile},
          ]}
        />
      </div>
      <div className='mainOuter'>
        <div className='mainContent'>
          <div className='topNav'>
            <h1>{title}</h1>

            <div>{goBack}</div>
            <div className='row'>
              <div className='linkText defaultMargin' onClick={() => logout()}>
                Logout
              </div>
            </div>
          </div>
          <hr />
          {content}
        </div>
      </div>
    </div>
  );
};
