import React from 'react';
import {capitalizeAllFirstLetters, setSelectValue, setTextInputvalue} from '../helper/helpers';
import {isLessonType, Lesson, LessonType, lessonTypes, readableLessonTypes} from '../helper/types';

type NavProps = {
  allLessons: Lesson[];
  setSearchResults: Function;
};

export const ViewLessonsNav: React.FC<NavProps> = ({allLessons, setSearchResults}: NavProps) => {
  // Lesson filters:
  function lessonsByType(lessons: Lesson[], type: LessonType) {
    const filteredLessons = [...lessons].filter((lesson) => lesson.type === type);
    return filteredLessons;
  }

  function searchLessons(searchString: string, lessons: Lesson[]) {
    const filteredLessons = [...lessons].filter((lesson) =>
      lesson.title.toLowerCase().includes(searchString.toLowerCase())
    );
    return filteredLessons;
  }

  function showAllLessons() {
    setSearchResults(allLessons);
  }

  // Search input onChange functions:
  function searchLessonOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectValue('filterByTypeSelect', '');
    if (!e.currentTarget.value) return showAllLessons();

    setSearchResults(searchLessons(e.currentTarget.value, allLessons));
  }

  function selectLessonTypeOnchange(e: React.ChangeEvent<HTMLSelectElement>) {
    setTextInputvalue('searchByTitleInput', '');
    if (!e.currentTarget.value) return showAllLessons();

    if (isLessonType(e.currentTarget.value)) setSearchResults(lessonsByType(allLessons, e.currentTarget.value));
  }

  // HTML generators:
  function getDataListOptions() {
    return allLessons.map((lesson) => <option value={lesson.title}>{lesson.description}</option>);
  }

  function getLessonTypeOptions() {
    return readableLessonTypes.map((type) => {
      return <option value={type.trim().replaceAll(' ', '_').toLowerCase()}>{type}</option>;
    });
  }

  return (
    <div>
      <div className='row spaceAround'>
        <div>
          <h3>Search By Title:</h3>
          <input
            id='searchByTitleInput'
            list='lessons'
            onFocus={(e) => (e.currentTarget.value = '')}
            placeholder={'Lesson title...'}
            onChange={(e) => {
              // Consider making sure default applies in here...
              searchLessonOnChange(e);
            }}
          />
          <datalist id='lessons'>{getDataListOptions()}</datalist>
        </div>
        <div>
          <h3>Filter By Type:</h3>
          <select id='filterByTypeSelect' onChange={selectLessonTypeOnchange}>
            <option value=''>Unselected...</option>
            {getLessonTypeOptions()}
          </select>
        </div>
      </div>
    </div>
  );
};
