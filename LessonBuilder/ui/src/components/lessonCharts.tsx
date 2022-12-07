import {useState} from 'react';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {capitalizeAllFirstLetters, getTotalPracticeTime, truncateText} from '../helper/helpers';
import {Lesson, lessonTypes, readableLessonTypes} from '../helper/types';
import {MinimizeButton} from './minimizeButton';

type props = {
  lessons: Lesson[];
};

export const LessonCharts: React.FC<props> = ({lessons}: props) => {
  const [chartsMinimized, setChartsMinimized] = useState(false);
  function numOfLessonsPerTypeData(): any {
    // Make this object indexable by string
    const numOfLessonsByType: {[key: string]: number} = {};

    for (const key of Object.keys(lessonTypes)) {
      numOfLessonsByType[key] = 0;
    }

    for (const lesson of lessons) {
      numOfLessonsByType[lesson.type] += 1;
    }

    const highestNum = Object.values(numOfLessonsByType).reduce((acc, curr) => (curr > acc ? curr : acc));

    const data = Object.keys(numOfLessonsByType).map((key) => {
      return {
        type: capitalizeAllFirstLetters(key.replaceAll('_', ' ')),
        num: numOfLessonsByType[key],
        highest: highestNum,
      };
    });

    return data;
  }

  function stepsAndPracTimesPerLessonData(): any {
    // { name: 'LessonName', practiceMin: '', practiceMax: '', numOfSteps: ''};

    const data = lessons.map((lesson) => {
      // Calc lesson's practice min/max
      const totalPracticeTimes = getTotalPracticeTime(lesson.steps);

      let pracMin = 0;
      let pracMax = 0;

      if (totalPracticeTimes) {
        if (totalPracticeTimes.includes('-')) {
          pracMin = +totalPracticeTimes.split(' - ')[0];
          pracMax = +totalPracticeTimes.split(' - ')[1];
        } else {
          pracMin = +totalPracticeTimes;
          pracMax = +totalPracticeTimes;
        }
      }

      return {
        name: truncateText(lesson.title, 45, true),
        'Practice Min': pracMin,
        'Practice Max': pracMax,
        'Number of Steps': lesson.steps.length,
      };
    });

    return data;
  }

  function avgPracticeTimePerLesson() {
    if (!lessons) return 0;

    let practiceTime = 0;
    let numOfLessonsWithPracticeTimes = 0;
    for (const lesson of lessons) {
      for (const step of lesson.steps) {
        let avgPracticeEachStep = step.practiceMin + step.practiceMax;
        if (avgPracticeEachStep > 0) {
          avgPracticeEachStep = avgPracticeEachStep / 2;
          numOfLessonsWithPracticeTimes++;
        }
        practiceTime += avgPracticeEachStep;
      }
    }
    if (practiceTime > 0) {
      return practiceTime / numOfLessonsWithPracticeTimes;
    }

    return practiceTime;
  }

  function avgStepsPerLessson() {
    let steps = 0;
    for (const lesson of lessons) {
      steps += lesson.steps.length;
    }

    if (steps > 0) steps = steps / lessons.length;

    return steps;
  }

  function chartsView() {
    return (
      <>
        {' '}
        {/* ------ Steps and practice time per lesson */}
        <div className='column centerChildren fadeInOnLoad'>
          <div className='h1-2'>Steps and Practice Time Per Lesson</div>

          <BarChart
            width={700}
            height={300}
            data={stepsAndPracTimesPerLessonData()}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='Practice Min' fill='var(--lightBlue)' />
            <Bar dataKey='Practice Max' fill='var(--blue)' />
            <Bar dataKey='Number of Steps' fill='var(--darkestBlue)' />
          </BarChart>
          <div>
            <div className='profileRow'>
              <div className='h1'>Avg Steps Per Lesson:</div>
              <div className='h2'>{avgStepsPerLessson().toFixed(1)}</div>
            </div>
            <div className='profileRow'>
              <div className='h1'>Avg Prac Time Per Lesson:</div>
              <div className='h2'>{avgPracticeTimePerLesson().toFixed(1)} mins</div>
            </div>
          </div>
        </div>
        {/* ------ Lessons Per Type */}
        <div className='column centerChildren fadeInOnLoad'>
          <div className='h1-2'>Number Of Lessons Per Type</div>
          <RadarChart
            outerRadius={120}
            width={450}
            height={300}
            data={numOfLessonsPerTypeData()}
            // margin={5}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey='type' />
            <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} />
            <Radar
              name='Number of Lessons'
              dataKey='num'
              stroke='var(--darkestBlue)'
              fill='var(--lightishBlue)'
              fillOpacity={0.6}
              activeDot={{r: 7, strokeWidth: 3}}
            />
            <Tooltip />
          </RadarChart>
        </div>
      </>
    );
  }

  return (
    <div className=''>
      <MinimizeButton onClick={() => setChartsMinimized(!chartsMinimized)} />
      <div className='profileCharts fadeInOnLoad'>{chartsMinimized ? '' : chartsView()}</div>
    </div>
  );
};
