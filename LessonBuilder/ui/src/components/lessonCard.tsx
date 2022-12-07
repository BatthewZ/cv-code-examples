import {
  capitalizeAllFirstLetters,
  capitalizeFirstLetter,
  getPracticeTime,
  getTotalPracticeTime,
  truncateText,
} from '../helper/helpers';
import {LessonProp} from '../helper/types';

export const LessonCard: React.FC<LessonProp> = ({lesson}: LessonProp) => {
  function pracTimeMsg() {
    const times = getTotalPracticeTime(lesson.steps);

    if (times) return 'Practice Time: ' + times + ' min(s)';

    // return 'Practice Times Unset';
  }

  return (
    <div className='lessonCard fadeInOnLoad'>
      <div className='cardHeader'>
        <div className='cardLessonType'>{capitalizeAllFirstLetters(lesson.type.replaceAll('_', ' '))}</div>
        <div className='cardTitle'>{truncateText(lesson.title, 59, true)}</div>
      </div>
      <div className='cardBody'>
        <div>
          <div className='cardSteps'>
            <strong>{lesson.steps.length ? 'Steps: ' + lesson.steps.length : ''}</strong>
          </div>
          <div className='cardPracticeTime'>{pracTimeMsg()}</div>
        </div>

        {truncateText(lesson.description, 175, true)}
      </div>
    </div>
  );
};
