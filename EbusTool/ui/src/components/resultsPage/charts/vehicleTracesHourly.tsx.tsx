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
import {getGraphHeight, getGraphWidth, lineColor1, lineColor2, lineColor3} from '../../../helper/graphHelpers';
import {Select} from '../../inputs/select';
import useWindowDimensions from '../windowDimensions';

type DataProps = {
  data: any;
};

export const VehicleTracesHourlyChart: React.FC<DataProps> = ({data}: DataProps) => {
  const {windowHeight, windowWidth} = useWindowDimensions();
  const [graphWidth, setGraphWidth] = useState<number>(0);
  const [totalGraphHeight, setTotalGraphHeight] = useState<number>(0);
  const [graphHeight, setGraphHeight] = useState<number>(0);
  const [selectedVehicle, setSelectedvehicle] = useState('');

  useEffect(() => {
    setGraphWidth(getGraphWidth());
    const individualGraphHeight = getGraphHeight();
    setTotalGraphHeight(individualGraphHeight);
    setGraphHeight(individualGraphHeight * 0.25);
  }, [windowHeight, windowWidth]);

  function mapVehicleOptions() {
    // This function assumes that the number of vehicles in transportKwHour,
    // chargeKwHour and socHour is the same.
    return Object.keys(data.transportKwHour[0])
      .filter((key) => key !== 'date')
      .map((vehicle) => (
        <option value={vehicle} key={vehicle + '-key'}>
          {vehicle}
        </option>
      ));
  }

  return (
    <div className='centerChildren' id='myChart'>
      <div>
        <select onChange={(e) => setSelectedvehicle(e.currentTarget.value)}>
          <option value=''>Select vehicle...</option>
          {mapVehicleOptions()}
        </select>
      </div>
      <p>
        <strong>Hourly Transport kW</strong>
      </p>
      <LineChart
        width={graphWidth}
        height={graphHeight}
        data={data.transportKwHour}
        syncId='anyId'
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey={'date'} />
        <YAxis dataKey={selectedVehicle} />
        <Tooltip />
        <Line
          type='monotone'
          strokeWidth={2}
          dot={false}
          dataKey={selectedVehicle}
          stroke={lineColor1}
          fill={lineColor1}
          activeDot={{r: 6, strokeWidth: 3}}
        />
      </LineChart>
      <p>
        <strong>Hourly Charge (kW)</strong>
      </p>
      <LineChart
        width={graphWidth}
        height={graphHeight}
        data={data.chargeKwHour}
        syncId='anyId'
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey={'date'} />
        <YAxis dataKey={selectedVehicle} />
        <Tooltip />
        <Line
          type='monotone'
          strokeWidth={2}
          dot={false}
          dataKey={selectedVehicle}
          stroke={lineColor2}
          fill={lineColor2}
          activeDot={{r: 6, strokeWidth: 3}}
        />
      </LineChart>
      <p>
        <strong>Hourly State of Charge</strong>
      </p>
      <LineChart
        width={graphWidth}
        height={graphHeight}
        data={data.socHour}
        syncId='anyId'
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey={'date'} />
        <YAxis dataKey={selectedVehicle} />
        <Tooltip />
        <Line
          type='monotone'
          strokeWidth={2}
          dot={false}
          dataKey={selectedVehicle}
          stroke={lineColor3}
          fill={lineColor3}
          activeDot={{r: 6, strokeWidth: 3}}
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
