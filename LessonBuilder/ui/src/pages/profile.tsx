import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {apiCall} from '../apiCalls/apiCalls';
import {DeleteButton} from '../components/deleteButton';
import {LessonCharts} from '../components/lessonCharts';
import {ShimmerText} from '../components/shimmerText';
import {
  convertResponseToLessons,
  getUserEmail,
  getUserName,
  readableLessonType,
  truncateText,
  unCheckSideNav,
} from '../helper/helpers';
import {Lesson} from '../helper/types';
import '../styles/profile.css';
import {CreateLesson} from './createLesson';

type props = {
  setModal: Function;
};

export const ProfilePage: React.FC<props> = ({setModal}: props) => {
  const [charts, setCharts] = useState(<h3>Loading...</h3>);
  const [usersLessons, setUsersLessons] = useState<Lesson[]>();
  const [lessonsView, setLessonsView] = useState(<></>);
  const [yourLessonsTitle, setYourLessonsTitle] = useState('Your Lessons');

  useEffect(() => {
    refreshPage();
  }, []);

  function refreshPage() {
    const getAllLessons = async () => {
      await apiCall.getLessons().then((response) => {
        if (response.lessons) {
          const lessonsOfUser = [...convertResponseToLessons(response)].filter(
            (lesson: Lesson) => lesson.email === getUserEmail()
          );
          setUsersLessons(lessonsOfUser);
          if (!lessonsOfUser.length) {
            setCharts(
              <p>
                You don't currently have any lessons saved. Select <strong>Create Lesson</strong> from the side menu to
                get started.
              </p>
            );
            return;
          }
          setCharts(<LessonCharts lessons={lessonsOfUser} />);
          setLessonsView(tabulateLessons(lessonsOfUser));
          setYourLessonsTitle('Your Lessons');
        }
      });
    };
    getAllLessons();
  }

  function getNumOfSteps() {
    let numOfSteps = 0;
    if (usersLessons) {
      for (const lesson of usersLessons) {
        numOfSteps += lesson.steps.length;
      }
    }
    return numOfSteps;
  }

  function tabulateLessons(lessons: Lesson[]) {
    function tableRows() {
      return lessons.map((lesson) => {
        return (
          <tr key={'tr-' + lesson.lessonID}>
            <td>
              <Link to={'/lesson/' + lesson.lessonID} className='linkText'>
                {lesson.title}
              </Link>
            </td>
            <td>{readableLessonType(lesson.type)}</td>
            <td>{lesson.steps.length}</td>
            <td>{truncateText(lesson.description, 100, true)}</td>
            <td>
              <button
                className='btn'
                onClick={() => {
                  setLessonsView(editLesson(lesson));
                  setYourLessonsTitle('Edit Lesson');
                }}
              >
                Edit
              </button>
            </td>
            <td>
              <DeleteButton
                confirmDelete={async () => {
                  await deleteLesson(lesson.lessonID, getUserEmail());
                }}
              />
            </td>
          </tr>
        );
      });
    } // Map Lessons Return:
    return (
      <table>
        <tr>
          <th>Title</th>
          <th>Type</th>
          <th># of Steps</th>
          <th>Description</th>
        </tr>
        {tableRows()}
      </table>
    );
  }

  async function deleteLesson(lessonId: string, email: string) {
    setModal('Deleting Lesson...', true);
    setLessonsView(<></>);
    await apiCall.deleteLesson(lessonId, email).then(() => {
      refreshPage();
      setModal('', false);
    });
  }

  function editLesson(lesson: Lesson) {
    const cancelButton = (
      <button className='btn' onClick={refreshPage}>
        Cancel
      </button>
    );

    return (
      <div className='column centerChildren'>
        <CreateLesson
          setModal={setModal}
          setMainPageTitle={() => {}}
          createOrUpdate={'update'}
          lesson={lesson}
          cancelButton={cancelButton}
          onSuccess={refreshPage}
        />
      </div>
    );
  }

  return (
    <div className='profile'>
      <div className='profileRow'>
        <div className='h1'>{getUserName()}</div>
        <div
          style={{
            minHeight: '1.7em',
            minWidth: '1px',
            backgroundColor: 'var(--lightBlue',
            margin: 'var(--defaultMargin)',
            opacity: '0.4',
          }}
        />
        <div className='h3'>{getUserEmail()}</div>
      </div>
      <div className='profileRow'>
        <div className='h1'>Total Lessons:</div>
        <div className='h2'>{usersLessons ? usersLessons.length : 0}</div>
      </div>
      <div className='profileRow'>
        <div className='h1'>Total Steps:</div>
        <div className='h2'>{getNumOfSteps()}</div>
      </div>
      <div>
        <hr />
      </div>
      {charts}
      <div>
        <hr />
      </div>
      <div className='h1-2'>{yourLessonsTitle}</div>
      {lessonsView}
    </div>
  );
};
