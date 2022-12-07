import {create} from 'domain';
import React, {useEffect, useState} from 'react';
import {v4 as uuid} from 'uuid';
import {apiCall} from '../apiCalls/apiCalls';
import {CloseButton} from '../components/closeButton';
import {EditableText} from '../components/EditableText';
import {LessonReader} from '../components/lessonReader';
import {LoadingModal} from '../components/loadingModal';
import {MakeStep} from '../components/makeStep';
import {StepsEditView} from '../components/StepsEditView';
import {HarmonyLessonDemo} from '../helper/demoLessons';
import {capitalizeAllFirstLetters, capitalizeFirstLetter, getUserEmail} from '../helper/helpers';
import {clearErrorMessages, setErrorMessage} from '../helper/setErrorMsg';
import {isLessonType, Lesson, LessonType, lessonTypes, Step} from '../helper/types';
import '../styles/createLesson.css';

type props = {
  lesson?: Lesson;
  setModal: Function;
  setMainPageTitle: Function;
  createOrUpdate: 'create' | 'update';
  cancelButton?: JSX.Element;
  onSuccess?: Function;
};

export const CreateLesson: React.FC<props> = ({
  lesson,
  setModal,
  setMainPageTitle,
  createOrUpdate,
  cancelButton = <></>,
  onSuccess = () => {},
}: props) => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [stepsEditView, setStepsEditView] = useState(
    <StepsEditView updateLessonReader={updateLessonReader} steps={steps} removeStep={removeStep} />
  );
  const [lessonType, setLessonType] = useState<LessonType>('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const lessonID = lesson ? lesson.lessonID : uuid();
  const email = lesson ? lesson.email : getUserEmail();
  const [viewLessonPreview, setViewLessonPreview] = useState(false);
  const [lessonCreated, setLessonCreated] = useState(false);

  useEffect(() => {
    setStepsEditView(
      steps.length ? (
        <StepsEditView updateLessonReader={updateLessonReader} steps={steps} removeStep={removeStep} />
      ) : (
        <></>
      )
    );
  }, [steps]);

  useEffect(() => {
    loadLesson();
  }, []);

  function loadLesson() {
    if (lesson) {
      setTitle(lesson.title);
      setDescription(lesson.description);
      setLessonType(lesson.type); // also set the dropdown to reflect the lesson type
      setSteps(lesson.steps);
    }
  }

  function updateLessonReader() {
    const newSteps = [...steps];
    setSteps(newSteps);
  }

  function getLessonAsJSON() {
    const lesson = {
      lessonID: lessonID,
      title: title,
      type: lessonType,
      description: description,
      steps: steps,
    };
    JSON.stringify(lesson);
    return JSON.stringify(lesson);
  }

  function saveToLocalStorage() {
    localStorage.setItem('lessonBuilder_Lesson', getLessonAsJSON());
  }

  function addStep() {
    setSteps((prev) => [
      ...prev,
      {
        id: uuid(),
        title: '',
        url: '',
        description: '',
        practiceMax: 0,
        practiceMin: 0,
        arrayIndex: prev.length,
      },
    ]);
  }

  function removeStep(stepId: string) {
    const newSteps = steps.filter((step) => step.id !== stepId);
    setSteps(() => updateStepIndexes(newSteps));
  }

  // Functionality for later:
  function moveStepUp(stepId: string) {}
  function moveStepDown(stepId: string) {}

  function updateStepIndexes(stepsToUpdate: Step[]) {
    const newSteps = [...stepsToUpdate];
    for (let i = 0; i < newSteps.length; i++) {
      newSteps[i].arrayIndex = i;
    }
    return newSteps;
  }

  function getLessonTypeOptions() {
    const types = Object.keys(lessonTypes);
    return types.map((typeKey) => {
      let typeName = capitalizeAllFirstLetters(typeKey.trim().replace('_', ' '));
      if (isLessonType(typeKey)) return <option value={typeKey}>{typeName}</option>;
    });
  }

  function removeEmptySteps() {
    // Function designed specifically to be used in conjunction with validateLesson.
    // This is to handle async useState side effects.
    const newSteps = [...steps].filter((step) => step.title || step.description || step.url);
    setSteps(() => updateStepIndexes(newSteps));
    return newSteps.length;
  }

  function validateLesson(numOfSteps: number) {
    // Function designed specifically to be used in conjunction with removeEmptySteps.
    // This is to handle async useState side effects.

    let isValid = true;
    let errMsg = '';

    if (!title || !title.trim().length) {
      errMsg += 'You must add a lesson title. \n';
      isValid = false;
    }

    if (!lessonType || !isLessonType(lessonType)) {
      errMsg += 'You must select a lesson type from the dropdown. \n';
      isValid = false;
    }

    if ((!description || !description.trim().length) && numOfSteps === 0) {
      errMsg += 'You must either have a lesson description, or at least one lesson step. \n';
      isValid = false;
    }

    if (!validateImgFilesizes()) {
      errMsg += `One of the step's upload images is too large. Please ensure each individual upload is no greater than 5mb.\n`;
      isValid = false;
    }

    if (!isValid) setErrorMessage('createLesson', errMsg);

    return isValid;
  }

  function validateImgFilesizes() {
    let isValid = true;
    for (const step of steps) {
      if (step.file) {
        if (step.file[0].size > 5 * 1024 * 1024) {
          isValid = false;
        }
      }
    }
    return isValid;
  }

  function getThisLesson(): Lesson {
    return {
      email: email,
      lessonID: lessonID,
      type: lessonType,
      description: description,
      title: title,
      steps: steps,
    };
  }

  async function submit() {
    clearErrorMessages(['createLesson']);

    const numOfSteps = removeEmptySteps();

    const modalMsg = (createOrUpdate === 'create' ? 'Uploading ' : 'Updating ') + 'lesson...';
    setModal(modalMsg, true);

    if (!validateLesson(numOfSteps)) {
      setModal('', false);
      return;
    }
    const response = await apiCall.createLesson(getThisLesson());

    // console.log(response.success);

    if (response.success) {
      setModal('', false);
      setLessonCreated(true);
      setMainPageTitle('Success!');
      onSuccess();
      return;
    }

    if (response.errMsg) {
      setModal('', false);
      setErrorMessage('createLesson', response.errMsg);
      return;
    }

    setErrorMessage('createLesson', 'Something went wrong uploading your lesson to the server.');
  }

  return (
    <>
      {lessonCreated ? (
        <>
          <h2>Lesson successfully {createOrUpdate + 'd'}!</h2>
          <p>Head to the View Lessons link to view it.</p>
        </>
      ) : (
        <div className='row spaceAround'>
          <div className='editLesson fadeInOnLoad' style={viewLessonPreview ? {width: '50%'} : {width: '100%'}}>
            <EditableText fieldName={'Title'} value={title} confirmEdit={setTitle} className={'h2 clickable'} />

            <select
              name='lessonType'
              id='lessonTypeSelect'
              className='lessonTypeSelect'
              onChange={(e) => {
                setLessonType(e.currentTarget.value as LessonType);
              }}
              defaultValue={lesson ? lesson.type : ''}
            >
              <option value=''>Select Lesson Type...</option>
              {getLessonTypeOptions()}
            </select>

            <EditableText
              inputType='textarea'
              fieldName={'Lesson Description'}
              value={description}
              confirmEdit={setDescription}
            />

            {stepsEditView}
            <p></p>
            <button className='btn' onClick={addStep}>
              Add Step
            </button>
            <p>
              <span className='errMsg' id='errMsg-createLesson'></span>
            </p>
            <button className='btn' onClick={submit}>
              {capitalizeFirstLetter(createOrUpdate)} Lesson
            </button>
            {cancelButton}
          </div>
          <div className='lessonPreview' style={viewLessonPreview ? {width: '50%'} : {}}>
            <p className='linkText' onClick={() => setViewLessonPreview(!viewLessonPreview)}>
              {viewLessonPreview ? 'Close Preview' : 'View Lesson Preview'}
            </p>
            <div style={viewLessonPreview ? {display: 'block'} : {display: 'none'}}>
              <LessonReader
                urlIsLive={false}
                lesson={{
                  email: email,
                  lessonID: lessonID,
                  title: title.length ? title : 'Lesson Preview',
                  type: lessonType ?? 'harmony',
                  description: description,
                  steps: steps,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
