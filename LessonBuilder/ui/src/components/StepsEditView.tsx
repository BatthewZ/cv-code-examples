import React, {useEffect, useState} from 'react';
import {getPracticeTime} from '../helper/helpers';
import {Step} from '../helper/types';
import {MakeStep} from './makeStep';

type StepCompProps = {
  steps: Step[];
  removeStep: Function;
  updateLessonReader: Function;
};

export const StepsEditView: React.FC<StepCompProps> = ({steps, removeStep, updateLessonReader}: StepCompProps) => {
  const [pracTimeMsg, setPracTimeMsg] = useState(<></>);

  useEffect(() => setPracTimeMsg(getPracTimeMsg()), []);

  function mapSteps() {
    return steps.map((step) => {
      return (
        <MakeStep
          key={step.id}
          step={step}
          removeStep={removeStep}
          updateLessonReader={updateLessonReader}
          updatePracticeTimeView={updatePracTime}
        />
      );
    });
  }

  function updatePracTime() {
    setPracTimeMsg(getPracTimeMsg());
  }

  function getPracTimeMsg() {
    let min = 0;
    let max = 0;
    for (const step of steps) {
      min += step.practiceMin;
      max += step.practiceMax;
    }

    const pracTimes = getPracticeTime(min, max);
    return <p className='lightishBlue'>{pracTimes ? 'Total Practice Time: ' + pracTimes + ' min(s)' : ''}</p>;
  }

  return (
    <div className='column'>
      <p className='h2'>Steps</p>
      {pracTimeMsg}
      {mapSteps()}
    </div>
  );
};
