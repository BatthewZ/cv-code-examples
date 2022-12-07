import React from 'react';
import {convertCsvToGraphJson} from './csvToJson';
import {Chart} from './Chart';
import {Table} from './table';
import {csvData} from './csvData';

export const ResultsPage: React.FC = () => {
  return (
    <div className='center'>
      {' '}
      <Table />
      <Chart dataProps={convertCsvToGraphJson(csvData)} title='Chart Title' />
    </div>
  );
};
