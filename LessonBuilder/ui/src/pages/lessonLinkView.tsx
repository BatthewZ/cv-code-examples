import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {apiCall} from '../apiCalls/apiCalls';
import {LessonReader} from '../components/lessonReader';
import {Logo} from '../components/logo';
import '../styles/lessonLinkView.css';
import {Link} from 'react-router-dom';
import {ShimmerText} from '../components/shimmerText';

export const LessonLinkView: React.FC = () => {
  const [content, setContent] = useState(<ShimmerText text='Loading...' />);

  const {id} = useParams();
  useEffect(() => {
    const getLesson = async () => {
      if (id)
        await apiCall.getLesson(id).then((response) => {
          if (response.lesson) {
            const steps = JSON.parse(response.lesson.steps);
            response.lesson.steps = steps;
            setContent(<LessonReader urlIsLive={false} lesson={response.lesson} />);
            return;
          }
          setContent(
            <p>
              Sorry! We were unable to find your lesson. Please double check that the URL is accurate. Otherwise, head{' '}
              <Link to='/' className='linkText'>
                Home
              </Link>{' '}
              to view and create lessons.
            </p>
          );
        });
    };
    getLesson();
  }, []);

  return (
    <div>
      <div className='lessonLinkView'>
        <div className='lessonLinkViewNav'>
          <Link to='/' style={{textDecoration: 'none', paddingTop: '10px', paddingBottom: '6px'}}>
            <Logo fontSize='2em' />
          </Link>
        </div>
        <div className='lessonLinkViewMain'>
          <div className='lessonLinkViewContent'>{content}</div>
        </div>
      </div>
    </div>
  );
};
