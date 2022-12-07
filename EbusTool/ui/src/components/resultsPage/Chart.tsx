import React, {useEffect, useState} from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush} from 'recharts';
import {screenshot} from '../../helper/screenshot';
import useWindowDimensions from './windowDimensions';

type ChartProps = {
  dataProps: {
    data: any[];
    highestValue: number;
  };
  title: string;
};

export const Chart: React.FC<ChartProps> = ({dataProps, title}: ChartProps) => {
  // Making dynamic height/width will make browsers *very janky* if the data sets are massive.
  // Working with 100 rows is fine on my PC. But working with 11,000 rows means waiting a few
  // seconds every time the browser size changes...
  const {windowHeight, windowWidth} = useWindowDimensions();
  const [graphWidth, setGraphWidth] = useState<number>();
  const [graphHeight, setGraphHeight] = useState<number>();

  useEffect(() => {
    setGraphWidth(getGraphWidth());
    setGraphHeight(getGraphHeight());
  }, [windowHeight, windowWidth]);

  function mapLineCharts() {
    const lines = [];
    for (const key of Object.keys(dataProps.data[0])) {
      if (key === 'name') continue;
      lines.push(<Line type='monotone' dataKey={key} dot={false} activeDot={{r: 7, strokeWidth: 3}} />);
    }
    return lines;
  }

  function getGraphHeight() {
    const footerHeight = document.getElementById('mainFooter')?.offsetHeight ?? 0;
    const headerHeight = document.getElementById('mainHeader')?.offsetHeight ?? 0;
    const vh = window.innerHeight;

    return (vh - footerHeight - headerHeight) * 0.9;
  }

  function getGraphWidth() {
    const vw = window.innerWidth;
    return vw * 0.8 * 0.9;
  }

  return (
    <div className='chartContainer'>
      <p></p>

      <div id='myChart1'>
        <h1>{title}</h1>
        <LineChart
          width={graphWidth}
          height={graphHeight}
          data={dataProps.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis dataKey='value' type='number' domain={[0, dataProps.highestValue]} />
          <Tooltip />
          <Legend verticalAlign='top' iconType='circle' margin={{bottom: 23}} />
          {mapLineCharts()}
          <Brush data={dataProps.data} stroke='var(--deepBlue)' fill='var(--nearlyWhite)' />
        </LineChart>
      </div>
      <button className='btn bg-paleBlue2' onClick={() => screenshot('myChart1', 'chart1')}>
        Export Image
      </button>
    </div>
  );
};
