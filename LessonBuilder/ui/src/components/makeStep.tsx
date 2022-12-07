import React, {ChangeEvent, HTMLInputTypeAttribute, useEffect, useState} from 'react';
import {getPracticeTime, truncateText} from '../helper/helpers';
import {Step} from '../helper/types';
import {CloseButton} from './closeButton';
import {EditableText} from './EditableText';
import {TextInput} from './TextInput';

type StepProps = {
  step: Step;
  removeStep: Function;
  updatePracticeTimeView: Function;
  updateLessonReader: Function;
};

export const MakeStep: React.FC<StepProps> = ({
  step,
  removeStep,
  updateLessonReader,
  updatePracticeTimeView,
}: StepProps) => {
  const [editOpen, setEditOpen] = useState(true);
  const [pracTimesOpen, setPracTimesOpen] = useState(false);
  const [description, setDescription] = useState(step.description ?? '');
  const [title, setTitle] = useState(step.title ?? '');
  const [practiceMin, setPracticeMin] = useState(step.practiceMin > 0 ? step.practiceMin : 0);
  const [practiceMax, setPracticeMax] = useState(step.practiceMax > 0 ? step.practiceMax : 0);
  const [filePath, setFilePath] = useState(step.url ?? '');
  const [img, setImg] = useState<FileList | null>();

  useEffect(() => {
    step.description = description;
  }, [description]);

  useEffect(() => {
    step.title = title;
  }, [title]);

  useEffect(() => {
    step.practiceMin = practiceMin;
    updatePracticeTimeView();
  }, [practiceMin]);

  useEffect(() => {
    step.practiceMax = practiceMax;
    updatePracticeTimeView();
  }, [practiceMax]);

  useEffect(() => {
    step.url = filePath;
  }, [filePath]);

  useEffect(() => {
    step.file = img ?? undefined;
  }, [img]);

  useEffect(() => {
    updateLessonReader(step.arrayIndex);
  }, [description, title, practiceMin, practiceMax, filePath]);

  function toggleEditView() {
    if (editOpen) setPracTimesOpen(false);
    setEditOpen(!editOpen);
  }

  const stepTitle = 'Step ' + (step.arrayIndex + 1);

  function checkState() {
    console.log('Title: ', title);
    console.log('description: ', description);
    console.log('practiceMin: ', practiceMin);
    console.log('filePath: ', filePath);
    console.log('Step:', step);
  }

  function practiceMsg() {
    const pracTimes = getPracticeTime(practiceMin, practiceMax);
    if (!pracTimes) return;

    return 'Practice Time: ' + pracTimes + ' min(s)';
  }

  function pracTimesOpenView() {
    return (
      <>
        <p className='linkText' onClick={() => setPracTimesOpen(!pracTimesOpen)}>
          Confirm Practice Times
        </p>
        <div className='row centerChildren fadeInOnLoad'>
          <label htmlFor={step.id + 'minPrac'}>Min:</label>
          <input
            type='number'
            id={step.id + 'minPrac'}
            onChange={(e) => {
              setPracticeMin(+e.target.value);
            }}
            placeholder='0'
            defaultValue={practiceMin}
          />
          <label htmlFor={step.id + 'maxPrac'}>Max:</label>
          <input
            type='number'
            id={step.id + 'maxPrac'}
            onChange={(e) => {
              if (+e.target.value > practiceMin) {
                setPracticeMax(+e.target.value);
              } else setPracticeMax(0);
            }}
            min={practiceMin}
            placeholder='0'
            defaultValue={practiceMax}
          />
        </div>
      </>
    );
  }

  function pracTimesClosedView() {
    return (
      <div className='linkText extraMargin' onClick={() => setPracTimesOpen(!pracTimesOpen)}>
        {practiceMsg() ?? 'Set Practice Times'}
      </div>
    );
  }

  function getFile(e: React.ChangeEvent<HTMLInputElement>) {
    setImg(e.currentTarget.files);
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      const myFile = e.currentTarget.files[0];
      const url = URL.createObjectURL(myFile);
      setFilePath(url);
    }
  }

  function removeImg() {
    setFilePath('');
    setImg(undefined);
  }

  function editOpenView() {
    return (
      <div className='fadeInOnLoad'>
        <TextInput name={'title'} label={'Title'} updateState={setTitle} defaultValue={title} />
        <label htmlFor={step.id + 'FileInput'} tabIndex={0}>
          <p className='linkText'>{!filePath ? 'Upload Image' : <img className='stepImageSmall' src={filePath} />}</p>
        </label>
        {filePath ? (
          <p className='linkText' onClick={removeImg}>
            Remove Image
          </p>
        ) : (
          ''
        )}
        <input type='file' onChange={getFile} id={step.id + 'FileInput'} style={{display: 'none'}} accept={'image/*'} />

        <TextInput
          type='textarea'
          name={'description'}
          label={'Description'}
          updateState={setDescription}
          defaultValue={description}
        />
        {pracTimesOpen ? pracTimesOpenView() : pracTimesClosedView()}
        {/* <p className='linkText'>Set Practice Times</p> */}

        <button className='btn extraMargin' onClick={toggleEditView}>
          Confirm Step
        </button>
      </div>
    );
  }

  return (
    <div className='step fadeInOnLoad column'>
      <div className='stepTitleRow'>
        <div className='stepTitleRow clickable' onClick={toggleEditView}>
          <div className='h3 column centerChildren sixtyBySixty'>{stepTitle}</div>

          <div className='stepTitleColumn'>
            <div>
              <strong style={{color: 'var(--blue)'}}>{title}</strong>
            </div>
            <div>{practiceMsg()}</div>
            <div style={{color: 'var(--lightishBlue)'}}>{truncateText(description, 50, true)}</div>
          </div>
        </div>
        <div className='column centerChildren sixtyBySixty'>
          <CloseButton onCloseFunction={() => removeStep(step.id)} />
        </div>
      </div>
      {editOpen ? editOpenView() : ''}
    </div>
  );
};
