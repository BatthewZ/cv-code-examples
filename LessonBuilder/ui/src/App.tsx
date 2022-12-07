import React, {useState} from 'react';
import './App.css';
import {LandingPage} from './pages/landingPage';
import {makeMyCode} from './helper/MakeMyCode';
import {MainPage} from './pages/mainPage';
import {Route, Routes} from 'react-router-dom';
import {LessonLinkView} from './pages/lessonLinkView';
import {isLoggedIn} from './helper/helpers';

function App() {
  const [content, setContent] = useState(isLoggedIn() ? <MainPage logout={logout} /> : <LandingPage login={login} />);

  function login() {
    setContent(<MainPage logout={logout} />);
  }

  function logout() {
    sessionStorage.removeItem('lessonbuilder');
    setContent(<LandingPage login={login} />);
  }

  return (
    <Routes>
      <Route path='/' element={<div className='App fadeInOnLoad'>{content}</div>} />
      <Route path='/lesson/:id' element={<LessonLinkView />} />
    </Routes>
  );
}

export default App;
