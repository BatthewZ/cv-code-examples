import React, {useEffect, useState} from 'react';
import {capitalizeAllFirstLetters, getPracticeTime} from '../helper/helpers';

import {ViewStep} from './viewStep';
import '../styles/viewLesson.css';
import {LessonProp, LessonType} from '../helper/types';
import {CopyIcon} from './copyIcon';

type readerProps = {
  urlIsLive: boolean;
};

export const LessonReader: React.FC<LessonProp & readerProps> = ({
  lesson,
  urlIsLive = true,
}: LessonProp & readerProps) => {
  const [stepIndex, setStepIndex] = useState(0);

  function nextStep() {
    if (lesson.steps.length) {
      if (stepIndex < lesson.steps.length - 1) setStepIndex((prev) => prev + 1);
    }
  }

  function previousStep() {
    if (stepIndex > 0) setStepIndex((prev) => prev - 1);
  }

  function getPracTime() {
    let min = 0;
    let max = 0;
    for (const step of lesson.steps) {
      min += step.practiceMin;
      max += step.practiceMax;
    }
    const practiceTime = getPracticeTime(min, max);
    return practiceTime ? 'Total Practice Time: ' + practiceTime + ' min(s)' : '';
  }

  function stepsNav() {
    const stepsNav = [];
    for (let i = 0; i < lesson.steps.length; i++) {
      stepsNav.push(
        <>
          <label
            className={stepIndex === i ? 'stepsNavChecked' : 'stepsNav'}
            htmlFor={'stepsNav' + i}
            onClick={() => setStepIndex(i)}
          ></label>
          <input type='radio' id={'stepsNav' + i} className='noDisplay' defaultChecked={i === stepIndex} />
        </>
      );
    }
    return <div className='row centerChildren'>{stepsNav}</div>;
  }

  function getUrl() {
    return window.location.href + 'lesson/' + lesson.lessonID;
  }

  async function copyToClipBoard() {
    // Not used for two reasons:
    // 1) Only works when served via https
    // 2) Workaround is to open URL in a new page, which takes the focus away from
    // the page that it's trying to get a URL from,r esulting in a Failed to Copy DOMException.

    try {
      await navigator.clipboard.writeText(getUrl());
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  return (
    <div className='lessonReader fadeInOnLoad'>
      <div className='lessonHeader'>
        <a href={urlIsLive ? getUrl() : '#'} target={urlIsLive ? '_blank' : ''} style={{textDecoration: 'none'}}>
          <h1 className={urlIsLive ? 'clickable' : ''}>
            {lesson.title}
            {urlIsLive ? <CopyIcon /> : ''}
          </h1>
        </a>

        <div className='lesson-lessonType'>{capitalizeAllFirstLetters(lesson.type.replaceAll('_', ' '))}</div>
        <div className='lesson-pracTime'>{getPracTime()}</div>
      </div>
      <div className='column centerChildren'>
        <p>{lesson.description}</p>
      </div>
      <hr />
      {stepsNav()}
      <div className='lessonStepsContainer'>
        <div className='arrowContainer'>
          <div className={stepIndex > 0 ? 'arrowButton noSelect' : 'noDisplay'} onClick={previousStep}>
            &lt;
          </div>
        </div>
        <div className='stepsContainer'>
          {lesson.steps.length ? <ViewStep step={lesson.steps[stepIndex]} stepIndex={stepIndex} /> : ''}
        </div>
        <div className='arrowContainer'>
          <div
            className={stepIndex < lesson.steps.length - 1 ? 'arrowButton noSelect' : 'noDisplay'}
            onClick={nextStep}
          >
            &gt;
          </div>
        </div>
      </div>
    </div>
  );
};
