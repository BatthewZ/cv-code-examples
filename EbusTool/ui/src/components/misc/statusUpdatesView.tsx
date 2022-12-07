import {useState} from 'react';
import {PieChart, Pie, Sector, ResponsiveContainer} from 'recharts';
import {GetSocket} from '../../websocket/websocket';
import {ShimmerText} from './shimmerText';

type text = {
  title: string;
  statusMessage: string;
};

export const StatusUpdatesView: React.FC<text> = ({statusMessage, title}: text) => {
  return (
    <div className='modalBlurb'>
      <ShimmerText text={title} />
      <div className='modalBlurbContent'>
        <hr />
        <strong>Status: </strong>
        {statusMessage}
      </div>
    </div>
  );
};
