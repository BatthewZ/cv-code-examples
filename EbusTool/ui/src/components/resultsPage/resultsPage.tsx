import {Table} from './table';
import {useState} from 'react';
import {RadioButtons} from '../inputs/radioButtons';
import {RadioOption} from '../../helper/types';
import {ChartHub} from './charts/chartHub';
import {screenshot} from '../../helper/screenshot';
import {emitMsg} from '../../websocket/websocket';

type ResultsPageProps = {
  data: any;
  goBack: Function;
};

export const ResultsPage: React.FC<ResultsPageProps> = ({goBack, data}: ResultsPageProps) => {
  const [selectedChart, setSelectedChart] = useState('');

  const graphSelectOptions: RadioOption[] = [
    {
      value: 'avgVehicleHourly',
      label: 'Agency Traces: Average Hourly Vehicle Demand',
      onClick: () => {
        setSelectedChart('avgVehicleHourly');
      },
    },
    {
      value: 'agencyMaximumDemandHourly',
      label: 'Agency Traces: Average Hourly Maximum Demand',
      onClick: () => {
        setSelectedChart('agencyMaximumDemandHourly');
      },
    },
    {
      value: 'vehicleTraces',
      label: 'Vehicle Traces: Hourly Data',
      onClick: () => {
        setSelectedChart('vehicleTraces');
      },
    },
  ];

  function openFilePath() {
    emitMsg('openFilePath', data.resultsFilePath);
  }

  return (
    <div>
      <h1>Results</h1>
      <p className='row wrap center'>
        All data can be found at:{' '}
        <div className='a defaultMargin' onClick={openFilePath}>
          {data.resultsFilePath}
        </div>
      </p>

      <div className='center'>
        {/* <Table /> */}
        <div className='rowWrap centerChildren'>
          <RadioButtons
            wrap={true}
            label='Select Graph'
            name={'notAKey'}
            updateState={() => {}}
            options={graphSelectOptions}
          />
        </div>
        <ChartHub allData={data} selectedChart={selectedChart} />
      </div>
      <p></p>
      <div className='row center'>
        <div>
          <button className='btn bg-pink' onClick={() => goBack()}>
            Go Back
          </button>
        </div>
        {selectedChart ? (
          <div>
            <button
              className='btn bg-skyBlue2'
              onClick={() => screenshot('myChart', selectedChart + '.jpg', data.resultsFilePath)}
            >
              Export Graph
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
