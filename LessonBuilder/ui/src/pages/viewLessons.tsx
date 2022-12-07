import React, {useEffect, useState} from 'react';
import {apiCall} from '../apiCalls/apiCalls';
import {LessonCard} from '../components/lessonCard';
import {ShimmerText} from '../components/shimmerText';
import {ViewLessonsNav} from '../components/viewLessonNav';
import {convertResponseToLessons} from '../helper/helpers';
import {Lesson, LessonType} from '../helper/types';

type ViewLessonProps = {
  viewLesson: Function;
};

export const ViewLessons: React.FC<ViewLessonProps> = ({viewLesson}: ViewLessonProps) => {
  const [content, setContent] = useState(<ShimmerText text='Loading...' />);
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    const getAllLessons = async () => {
      await apiCall.getLessons().then((response) => {
        if (!response.success) {
          setContent(<p>Something went wrong loading lessons. Please contact an administrator.</p>);
        }
        if (response.lessons) {
          const lessons = convertResponseToLessons(response);
          setAllLessons(lessons);
          setContent(<>{mapLessons(lessons)}</>);
        }
      });
    };
    getAllLessons();
  }, []);

  function setMappedLessons(lessons: Lesson[]) {
    setContent(<>{mapLessons(lessons)}</>);
  }

  function mapLessons(lessons: Lesson[]) {
    return lessons.map((lesson) => {
      return (
        <div onClick={() => viewLesson(lesson)}>
          <LessonCard lesson={lesson} />
        </div>
      );
    });
  }

  return (
    <div className='viewLessons'>
      <ViewLessonsNav allLessons={allLessons} setSearchResults={setMappedLessons} />
      <div className='viewCards'>{content}</div>
    </div>
  );
};
