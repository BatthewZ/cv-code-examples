import React, {useEffect, useState} from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  Area,
  ResponsiveContainer,
} from 'recharts';
import {getGraphHeight, getGraphWidth, lineColor1, lineColor2} from '../../../helper/graphHelpers';
import useWindowDimensions from '../windowDimensions';

type DataProps = {
  data: any;
};

export const AvgHourlyMaxChart: React.FC<DataProps> = ({data}: DataProps) => {
  const {windowHeight, windowWidth} = useWindowDimensions();
  const [graphWidth, setGraphWidth] = useState<number>(0);
  const [totalGraphHeight, setTotalGraphHeight] = useState<number>(0);
  const [graphHeight, setGraphHeight] = useState<number>(0);

  useEffect(() => {
    setGraphWidth(getGraphWidth());
    const individualGraphHeight = getGraphHeight();
    setTotalGraphHeight(individualGraphHeight);
    setGraphHeight(individualGraphHeight * 0.45);
  }, [windowHeight, windowWidth]);

  return (
    <div className='centerChildren' id='myChart'>
      <p>
        <strong>Total Charge (kW)</strong>
      </p>
      <LineChart
        width={graphWidth}
        height={graphHeight}
        data={data}
        syncId='anyId'
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip />
        <Line
          type='monotone'
          activeDot={{r: 6, strokeWidth: 3}}
          strokeWidth={2}
          dot={false}
          dataKey='total_charge_kW'
          stroke={lineColor1}
          fill={lineColor1}
        />
      </LineChart>
      <LineChart
        width={graphWidth}
        height={graphHeight}
        data={data}
        syncId='anyId'
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip />
        <Line
          type='monotone'
          activeDot={{r: 6, strokeWidth: 3}}
          strokeWidth={2}
          dot={false}
          dataKey='total_transport_consumption_kW'
          stroke={lineColor2}
          fill={lineColor2}
        />

        <Brush
          dataKey={'date'}
          stroke='var(--deepBlue)'
          fill='var(--nearlyWhite)'
          x={graphWidth * 0.2}
          width={graphWidth * 0.6}
        />
      </LineChart>
    </div>
  );
};
