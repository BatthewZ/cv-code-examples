import React from 'react';
import {getPracticeTime} from '../helper/helpers';
import {Step} from '../helper/types';

type ViewStepProps = {
  step: Step;
  stepIndex: number;
};

export const ViewStep: React.FC<ViewStepProps> = ({step, stepIndex}: ViewStepProps) => {
  if (!step) {
    // Added for handling "Lesson Preview" errors from CreateLesson,
    // where a step might be selected in the lesson preview, but
    // the user deletes it from the step list in the lesson editor.
    return <div></div>;
  }

  function getImg() {
    let img = <></>;
    try {
      img = <img src={step.url} className='fadeInOnLoad' id={'img' + step.id} />;
    } catch (e) {
      console.log("Image couldn't load: ", e);
    }
    return img;
  }

  function practiceTime() {
    const pracTime = getPracticeTime(step.practiceMin, step.practiceMax);
    return pracTime ? 'Practice Time: ' + pracTime + ' min(s)' : '';
  }

  return (
    <div className='viewStep fadeInOnLoad'>
      <h2>
        Step {stepIndex + 1}: {step.title}
      </h2>
      <div className='step-pracTime'>{practiceTime()}</div>
      {getImg()}
      <div className='column centerChildren'>
        <p>{step.description}</p>
      </div>
    </div>
  );
};
