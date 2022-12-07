import {Chart} from './Chart';
import {convertCsvToGraphJson} from './csvToJson';
import {Table} from './table';
import {csvData} from './csvData';

type ResultsPageProps = {
  goBack: Function;
};

export const ResultsPage: React.FC<ResultsPageProps> = ({goBack}: ResultsPageProps) => {
  return (
    <div>
      <h1>Results</h1>
      <div className='center'>
        <Table />
        <Chart dataProps={convertCsvToGraphJson(csvData)} title='Chart Title' />
      </div>
      <button className='btn bg-pink' onClick={() => goBack()}>
        Go Back
      </button>
    </div>
  );
};
